import { getEqOperator } from '@/lib/helpers'
import { Order, SearchQuery } from '@/types/search'
import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'


export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
  db:{
    schema:"adviser" as any
  }
})

type OrQuriesProp = {
  forigenTable: string | null
  query: string
}
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  let from = page ? page * limit : 0
  let to = page ? from + size : size

  if (from !== 0) {
    ++from
    ++to
  }

  return { from, to }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, res: Response) {
  try {
    var OrQuries: OrQuriesProp[] = []

    const requestData = (await req.json()) as SearchQuery
    var query = supabase.from(requestData.Table!).select(requestData.Select, { count: 'exact' })

    requestData.FilterByOptions.map((i) => {
      if (i.MemberName.includes('.')) {
        let memberNames = i.MemberName?.split('.')
        if (OrQuries.find((x) => x.forigenTable == memberNames[0])) {
          OrQuries.map((o) => {
            if (o.forigenTable == memberNames[0]) {
              o.query += `${memberNames[1]}.${getEqOperator(i.FilterOperator)}.${i.FilterFor},`
            }
          })
        } else {
          OrQuries.push({
            forigenTable: memberNames[0],
            query: `${memberNames[1]}.${getEqOperator(i.FilterOperator)}.${i.FilterFor},`,
          })
        }
      } else {
        OrQuries.push({
          forigenTable: null,
          query: `${i.MemberName}.${getEqOperator(i.FilterOperator)}.${i.FilterFor},`,
        })
      }
    })

    if (OrQuries.length > 0) {
      OrQuries.map((o) => {
        o.query = o.query.slice(0, -1)
        if (o.forigenTable) {
          query = query.or(o.query, { foreignTable: o.forigenTable })
        } else {
          query = query.or(o.query)
        }
      })
    }

    if (requestData.OrderByOptions.length > 0) {
      query = query.order(requestData.OrderByOptions[0].MemberName, {
        ascending: requestData.OrderByOptions[0].SortOrder == Order.ASC ? true : false,
      })
    }

    const { from, to } = getPagination(requestData.PageIndex, requestData.PageSize)
    query = query.range(from, to)

    const { data: result, count, error } = await query

    if (error) {
      console.error(error)
      throw new Error(error.details)
    }
    return NextResponse.json({
      success: true,
      results: result,
      result: result[0] ?? null,
      total: count,
    }, { headers: corsHeaders })
  } catch (ex) {
    console.error('ex', ex)
    return NextResponse.json({
      success: false,
      message: ex as any,
    }, { headers: corsHeaders })
  }
}

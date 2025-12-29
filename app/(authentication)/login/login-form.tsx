"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LoginUserInput, loginUserSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputPassword from "@/components/ui/input-password";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/auth-client";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const form = useForm<LoginUserInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginUserSchema),
  });

  const { mutate, data, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginUserInput) => {
      const callbackURL = searchParams.get("callback") ?? "/admin";
      const r = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL,
      });

      return r;
    },
    mutationKey: ["Login-user"],
    onSuccess(data) {
      if (data.error) {
        toast.error(`${data.error.code}: ${data.error.message}`);
        return;
      }
      toast.success("Login successfully");
    },
  });

  return (
    <div className="z-10 mx-auto w-full max-w-[500px] text-gray-700">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-normal tracking-tighter">
              Welcome back
            </h1>
            <p className="font-normal text-gray-800/90">
              Sign in to your account to continue
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((e) => mutate(e))}>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl ltr>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl ltr>
                        <InputPassword
                          {...field}
                          disabled={form.formState.isSubmitting}
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {data?.error && (
                <Alert
                  variant={"destructive"}
                  className="mb-4 bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                  <AlertTitle className="font-bold">
                    Authentication Failed
                  </AlertTitle>
                  <AlertDescription>{data.error.message}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isPending}
                className="w-full"
              >
                <span className="relative">Sign In</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

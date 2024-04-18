"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/supabase";
import { Form, Field } from "react-final-form";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  formDetails: Pick<
    Tables<"forms">,
    "title" | "description" | "cover_url" | "id"
  >;
}

export default function FormDetails({ formDetails }: Props) {
  const [formContent, setFormContent] = useState("");

  const onSubmit = async (values: Record<string, string>) => {
    const supabaseClient = createClient();
    console.log(formDetails.id);
    const damn = await supabaseClient
      .from("forms")
      .update({
        title: values.title,
        description: values.description,
        cover_url: values.cover_url,
      })
      .eq("id", formDetails.id)
      .select("*");
  };

  return (
    <div className="mt-10 w-[400px] relative hidden flex-col items-start gap-8 md:flex">
      <Form
        initialValues={{
          title: formDetails.title,
          cover_url: formDetails.cover_url,
          description: formDetails.description,
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-start gap-6"
          >
            <div className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Form Details
              </legend>
              <Field
                name="title"
                render={({ input }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="model">Form Title</Label>
                    <Input
                      value={input.value}
                      onChange={input.onChange}
                      id="form-title"
                      type="text"
                      placeholder="Enter your form title"
                    />
                  </div>
                )}
              ></Field>
              <Field
                name="cover_url"
                render={({ input }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="form-banner">Form Banner</Label>
                    <Input
                      value={input.value}
                      onChange={input.onChange}
                      id="form-banner"
                      type="url"
                      placeholder="https://unsplash.com/photos/a-marble-pattern-with-a-pastel-blue-and-beige-color-scheme-5jgvVlkI0mw"
                    />
                  </div>
                )}
              />
              <div className="grid gap-4">
                <Label>Form Contents</Label>
                <Field
                  name="description"
                  render={({ input }) => (
                    <ReactQuill
                      theme="snow"
                      value={input.value}
                      onChange={input.onChange}
                    />
                  )}
                />
              </div>
              <Button type="submit" className="w-full z-9">
                Update Form
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
}

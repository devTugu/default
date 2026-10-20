// @ts-nocheck
"use client";

import { useState } from "react";
import { Button } from "@default/ui/primitives/button";
import PersonalForm from "./personal-form";
import WorkspaceForm from "./workspace-form";
import NetworkForm from "./network-form";
import { Tabs, TabsContent } from "@default/ui/primitives/tabs";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Separator } from "@default/ui/primitives/separator";
import { ChevronRight } from "lucide-react";
import { cn } from "@default/ui/lib/cn";

const steps = [
  { id: 1, value: "personal", title: "User Details", description: "User data" },
  {
    id: 2,
    value: "workspace",
    title: "Workspace",
    description: "Workspace setup",
  },
  { id: 3, value: "network", title: "Network", description: "Network setup" },
];

const Form = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <section className="py-8 sm:py-16 lg:py-20">
      <div className="max-w-6xl xl:px-16 lg:px-8 px-4 mx-auto">
        <Card className="pt-0 overflow-hidden">
          <CardContent className="px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-8 py-6 border-b border-border bg-muted/5 gap-4">
              {steps.map((step, index) => {
                const isActive = activeTab === step.value;
                const isPast =
                  steps.findIndex((s) => s.value === activeTab) > index;

                return (
                  <div
                    key={step.value}
                    className="flex items-center gap-4 flex-1 last:flex-none"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab(step.value)}
                      className="flex items-center gap-4 group cursor-pointer text-left"
                    >
                      <div
                        className={cn(
                          "size-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                          isPast
                            ? "bg-teal-400 text-white"
                            : isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {step.id}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-sm font-bold transition-colors",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {step.title}
                        </span>
                        <span className="text-xs text-muted-foreground/60 font-medium">
                          {step.description}
                        </span>
                      </div>
                    </button>
                    {index < steps.length - 1 && (
                      <div className="hidden sm:block mx-auto">
                        <ChevronRight className="size-4 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <form className="space-y-6 pt-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="gap-6"
              >
                <TabsContent value="personal">
                  <PersonalForm />
                </TabsContent>
                <TabsContent value="workspace">
                  <WorkspaceForm />
                </TabsContent>
                <TabsContent value="network">
                  <NetworkForm />
                </TabsContent>
              </Tabs>
              <div className="space-y-4">
                <Separator />
                <div className="flex gap-3 items-center px-6">
                  <Button
                    type="button"
                    variant={"outline"}
                    className="rounded-lg cursor-pointer h-9 shadow-xs"
                    onClick={() => {
                      const currentIndex = steps.findIndex(
                        (s) => s.value === activeTab,
                      );
                      if (currentIndex > 0) {
                        setActiveTab(steps[currentIndex - 1].value);
                      }
                    }}
                    disabled={activeTab === "personal"}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="rounded-lg cursor-pointer h-9 hover:bg-primary/80"
                    onClick={() => {
                      const currentIndex = steps.findIndex(
                        (s) => s.value === activeTab,
                      );
                      if (currentIndex < steps.length - 1) {
                        setActiveTab(steps[currentIndex + 1].value);
                      }
                    }}
                  >
                    {activeTab === "network" ? "Save Changes" : "Continue"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Form;

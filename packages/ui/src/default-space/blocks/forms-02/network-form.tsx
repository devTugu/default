// @ts-nocheck
"use client";

import { Checkbox } from "@default/ui/primitives/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@default/ui/primitives/field";
import { RadioGroup, RadioGroupItem } from "@default/ui/primitives/radio-group";

const NetworkForm = () => {
  return (
    <div className="space-y-8 px-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          Email notifications
        </h3>

        <Field orientation="horizontal" className="items-start gap-3">
          <Checkbox id="email-notifications" defaultChecked className="mt-1" />
          <FieldContent>
            <FieldLabel
              htmlFor="email-notifications"
              className="text-sm font-medium leading-none"
            >
              Send notifications by email
            </FieldLabel>
            <FieldDescription className="text-sm text-muted-foreground mt-1">
              You'll still get other emails from Figma, like important account
              or billing info.
            </FieldDescription>
          </FieldContent>
        </Field>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              File comments
            </h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="file-all" />
                <FieldLabel htmlFor="file-all" className="text-sm font-medium">
                  All comments, mentions, and replies
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mentions" id="file-mentions" />
                <FieldLabel
                  htmlFor="file-mentions"
                  className="text-sm font-medium"
                >
                  Only mentions and replies
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="file-none" />
                <FieldLabel htmlFor="file-none" className="text-sm font-medium">
                  None
                </FieldLabel>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Invites and requests
            </h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="invites-all" />
                <FieldLabel
                  htmlFor="invites-all"
                  className="text-sm font-medium"
                >
                  All types of invites and requests
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="response" id="invites-response" />
                <FieldLabel
                  htmlFor="invites-response"
                  className="text-sm font-medium"
                >
                  Only invites and requests that need my response
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="invites-none" />
                <FieldLabel
                  htmlFor="invites-none"
                  className="text-sm font-medium"
                >
                  None
                </FieldLabel>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Community comments
            </h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="community-all" />
                <FieldLabel
                  htmlFor="community-all"
                  className="text-sm font-medium"
                >
                  All comments on my published resources
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mentions" id="community-mentions" />
                <FieldLabel
                  htmlFor="community-mentions"
                  className="text-sm font-medium"
                >
                  Only mentions and replies
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="community-none" />
                <FieldLabel
                  htmlFor="community-none"
                  className="text-sm font-medium"
                >
                  None
                </FieldLabel>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              User groups
            </h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="groups-all" />
                <FieldLabel
                  htmlFor="groups-all"
                  className="text-sm font-medium"
                >
                  Shared resources and when added to user groups
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resources" id="groups-resources" />
                <FieldLabel
                  htmlFor="groups-resources"
                  className="text-sm font-medium"
                >
                  Only shared resources
                </FieldLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="groups-none" />
                <FieldLabel
                  htmlFor="groups-none"
                  className="text-sm font-medium"
                >
                  None
                </FieldLabel>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-semibold text-foreground">
          Activity digests
        </h3>
        <Field orientation="horizontal" className="items-center gap-3">
          <Checkbox id="community-weekly" defaultChecked />
          <FieldLabel
            htmlFor="community-weekly"
            className="text-sm font-medium leading-none"
          >
            Activity on my Community resources - Weekly
          </FieldLabel>
        </Field>
      </div>
    </div>
  );
};

export default NetworkForm;

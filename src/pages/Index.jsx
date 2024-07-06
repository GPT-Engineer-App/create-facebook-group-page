import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const groupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  groupType: z.string().min(1, "Group type is required"),
  otherGroupType: z.string().optional(),
  groupDescription: z.string().optional(),
  groupCoverPhoto: z.any().optional(),
  groupLocation: z.string().optional(),
});

const Index = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(groupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast("Group created successfully!");
  };

  const groupType = watch("groupType");

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create a Facebook Group</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Controller
                name="groupName"
                control={control}
                render={({ field }) => <Input id="groupName" placeholder="Enter group name" {...field} />}
              />
              {errors.groupName && <p className="text-red-500">{errors.groupName.message}</p>}
            </div>

            <div>
              <Label htmlFor="groupType">Group Type</Label>
              <Controller
                name="groupType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    setShowOtherInput(value === "Other");
                  }}>
                    <SelectTrigger id="groupType">
                      <SelectValue placeholder="Select group type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                      <SelectItem value="Hobbies">Hobbies</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.groupType && <p className="text-red-500">{errors.groupType.message}</p>}
            </div>

            {showOtherInput && (
              <div>
                <Label htmlFor="otherGroupType">Specify Other Group Type</Label>
                <Controller
                  name="otherGroupType"
                  control={control}
                  render={({ field }) => <Input id="otherGroupType" placeholder="Specify other group type" {...field} />}
                />
              </div>
            )}

            <div>
              <Label htmlFor="groupDescription">Group Description</Label>
              <Controller
                name="groupDescription"
                control={control}
                render={({ field }) => <Textarea id="groupDescription" placeholder="Enter group description" {...field} />}
              />
            </div>

            <div>
              <Label htmlFor="groupCoverPhoto">Group Cover Photo</Label>
              <Controller
                name="groupCoverPhoto"
                control={control}
                render={({ field }) => <Input id="groupCoverPhoto" type="file" {...field} />}
              />
            </div>

            <div>
              <Label htmlFor="groupLocation">Group Location (Optional)</Label>
              <Controller
                name="groupLocation"
                control={control}
                render={({ field }) => <Input id="groupLocation" placeholder="Enter group location" {...field} />}
              />
            </div>

            <Button type="submit" className="w-full">Create Group</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

interface DriverDetailsSheetProps {
  children: React.ReactNode;
  driver: any; // Replace 'any' with the actual type of your driver object
}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

const DriverDetailsSheet: React.FC<DriverDetailsSheetProps> = ({
  children,
  driver,
}) => {
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: driver?.firstName || "",
      lastName: driver?.lastName || "",
      email: driver?.email || "",
      phone: driver?.phone || "",
    },
  });

  useEffect(() => {
    // Update form default values when the driver prop changes
    form.reset({
      firstName: driver?.firstName || "",
      lastName: driver?.lastName || "",
      email: driver?.email || "",
      phone: driver?.phone || "",
    });
  }, [driver, form.reset]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[625px]">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            Make changes to your driver profile here. Click save when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{`${driver?.firstName} ${driver?.lastName}`}</h4>
              <Badge variant="secondary">
                {driver?.status ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bank Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input
                      id="accountHolder"
                      value={bankDetails.accountHolder}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          accountHolder: e.target.value,
                        })
                      }
                      placeholder="Enter account holder name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={bankDetails.bankName}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          bankName: e.target.value,
                        })
                      }
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      type="password"
                      value={bankDetails.accountNumber}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          accountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input
                      id="routingNumber"
                      value={bankDetails.routingNumber}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          routingNumber: e.target.value,
                        })
                      }
                      placeholder="Enter routing number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select
                      value={bankDetails.accountType}
                      onValueChange={(value) =>
                        setBankDetails({ ...bankDetails, accountType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DriverDetailsSheet;

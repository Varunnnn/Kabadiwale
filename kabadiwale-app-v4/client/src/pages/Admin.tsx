import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Trash2, CheckCircle, AlertCircle, Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Booking {
  id: number;
  items: string[];
  address: string;
  date: string;
  timeSlot: string;
  paymentMethod: string;
  status: BookingStatus;
  createdAt: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");

  const { data: bookings, isLoading, error, refetch } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  useEffect(() => {
    document.title = "Admin Dashboard | Kabadiwale";
  }, []);

  const updateBookingStatus = async (id: number, status: BookingStatus) => {
    try {
      await apiRequest("PATCH", `/api/bookings/${id}`, { status });
      toast({
        title: "Status Updated",
        description: `Booking #${id} status changed to ${status}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update booking status",
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    
    try {
      await apiRequest("DELETE", `/api/bookings/${id}`, undefined);
      toast({
        title: "Booking Deleted",
        description: `Booking #${id} has been deleted`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Could not delete booking",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const filteredBookings = statusFilter === "all" 
    ? bookings 
    : bookings?.filter(booking => booking.status === statusFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeSlotText = (slot: string) => {
    switch(slot) {
      case "morning": return "Morning (8:00 AM - 12:00 PM)";
      case "afternoon": return "Afternoon (12:00 PM - 4:00 PM)";
      case "evening": return "Evening (4:00 PM - 8:00 PM)";
      default: return slot;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-4 text-destructive">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-4">Error Loading Data</h1>
            <p className="text-center mb-6">Could not load bookings data. Please try again later.</p>
            <div className="flex justify-center">
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              size="sm"
            >
              <Clock className="h-4 w-4 mr-2" /> Pending
            </Button>
            <Button
              variant={statusFilter === "confirmed" ? "default" : "outline"}
              onClick={() => setStatusFilter("confirmed")}
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" /> Confirmed
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Scrap Collection Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings && filteredBookings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>{formatDate(booking.date)}</div>
                        <div className="text-sm text-gray-500">{getTimeSlotText(booking.timeSlot)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {booking.items.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{booking.address}</TableCell>
                      <TableCell className="capitalize">{booking.paymentMethod}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {booking.status === "pending" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            >
                              Confirm
                            </Button>
                          )}
                          {booking.status === "confirmed" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "completed")}
                            >
                              Complete
                            </Button>
                          )}
                          <Button 
                            variant="destructive" 
                            size="icon-sm"
                            onClick={() => deleteBooking(booking.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings found</p>
                {statusFilter !== "all" && (
                  <Button 
                    variant="link" 
                    onClick={() => setStatusFilter("all")}
                    className="mt-2"
                  >
                    Show all bookings
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;

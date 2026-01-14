import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, Filter, Mail, Phone, Building, Calendar, Eye, Trash2, Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget_range: string | null;
  message: string;
  status: string | null;
  created_at: string;
  user_id: string | null;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  read: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  replied: "bg-green-500/20 text-green-400 border-green-500/30",
  archived: "bg-muted text-muted-foreground border-border",
};

const statusIcons: Record<string, React.ReactNode> = {
  new: <AlertCircle className="w-3 h-3" />,
  read: <Eye className="w-3 h-3" />,
  replied: <Check className="w-3 h-3" />,
  archived: <Clock className="w-3 h-3" />,
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      if (error || !data) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    };

    checkAdmin();
  }, [user, navigate, toast]);

  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContactSubmission[];
    },
    enabled: isAdmin === true,
  });

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Submission marked as ${newStatus}.`,
      });
      refetch();
    }
  };

  const deleteSubmission = async (id: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Submission has been deleted.",
      });
      refetch();
    }
  };

  const filteredSubmissions = submissions?.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (submission.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    const matchesProjectType = projectTypeFilter === "all" || submission.project_type === projectTypeFilter;

    return matchesSearch && matchesStatus && matchesProjectType;
  });

  const stats = {
    total: submissions?.length ?? 0,
    new: submissions?.filter((s) => s.status === "new").length ?? 0,
    read: submissions?.filter((s) => s.status === "read").length ?? 0,
    replied: submissions?.filter((s) => s.status === "replied").length ?? 0,
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Admin <span className="text-gradient-accent">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Manage contact form submissions
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    New
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-400">{stats.new}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Read
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-yellow-400">{stats.read}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Replied
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-400">{stats.replied}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, company, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="branding">Brand Identity</SelectItem>
                  <SelectItem value="web">Web Design</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="packaging">Packaging</SelectItem>
                  <SelectItem value="print">Print & Marketing</SelectItem>
                  <SelectItem value="logo">Logo Design</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Submissions List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredSubmissions?.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No submissions found.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredSubmissions?.map((submission) => (
                  <Card key={submission.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-semibold text-lg">{submission.name}</h3>
                            <Badge
                              variant="outline"
                              className={statusColors[submission.status || "new"]}
                            >
                              {statusIcons[submission.status || "new"]}
                              <span className="ml-1 capitalize">{submission.status || "new"}</span>
                            </Badge>
                            {submission.project_type && (
                              <Badge variant="secondary" className="capitalize">
                                {submission.project_type.replace(/-/g, " ")}
                              </Badge>
                            )}
                            {submission.budget_range && (
                              <Badge variant="outline">
                                {submission.budget_range === "under-1k" && "Under $1K"}
                                {submission.budget_range === "1k-5k" && "$1K - $5K"}
                                {submission.budget_range === "5k-10k" && "$5K - $10K"}
                                {submission.budget_range === "10k-25k" && "$10K - $25K"}
                                {submission.budget_range === "25k+" && "$25K+"}
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {submission.email}
                            </span>
                            {submission.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {submission.phone}
                              </span>
                            )}
                            {submission.company && (
                              <span className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {submission.company}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(submission.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          <p className="text-sm text-foreground line-clamp-2">
                            {submission.message}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Submission from {submission.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{submission.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{submission.phone || "—"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Company</p>
                                    <p className="font-medium">{submission.company || "—"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Project Type</p>
                                    <p className="font-medium capitalize">
                                      {submission.project_type?.replace(/-/g, " ") || "—"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Budget Range</p>
                                    <p className="font-medium">{submission.budget_range || "—"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Submitted</p>
                                    <p className="font-medium">
                                      {new Date(submission.created_at).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                                  <p className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                                    {submission.message}
                                  </p>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Select
                                    value={submission.status || "new"}
                                    onValueChange={(value) => updateStatus(submission.id, value)}
                                  >
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="read">Read</SelectItem>
                                      <SelectItem value="replied">Replied</SelectItem>
                                      <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      window.open(`mailto:${submission.email}`, "_blank")
                                    }
                                  >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Reply via Email
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Select
                            value={submission.status || "new"}
                            onValueChange={(value) => updateStatus(submission.id, value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="replied">Replied</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteSubmission(submission.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

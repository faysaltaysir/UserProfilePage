"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const divisions = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"
];

const districtsByDivision: Record<string, string[]> = {
  Dhaka: [
    "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Kishoreganj", "Faridpur",
    "Manikganj", "Munshiganj", "Rajbari", "Gopalganj", "Madaripur", "Shariatpur"
  ],
  Chattogram: [
    "Chattogram", "Cox's Bazar", "Comilla", "Feni", "Noakhali", "Lakshmipur",
    "Brahmanbaria", "Khagrachhari", "Rangamati", "Bandarban"
  ],
  Rajshahi: [
    "Rajshahi", "Bogra", "Naogaon", "Pabna", "Natore", "Joypurhat",
    "Chapainawabganj", "Sirajganj"
  ],
  Khulna: [
    "Khulna", "Jessore", "Satkhira", "Bagerhat", "Jhenaidah", "Magura",
    "Narail", "Kushtia", "Chuadanga", "Meherpur"
  ],
  Barishal: [
    "Barishal", "Bhola", "Patuakhali", "Jhalokathi", "Pirojpur", "Barguna"
  ],
  Sylhet: [
    "Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"
  ],
  Rangpur: [
    "Rangpur", "Dinajpur", "Kurigram", "Nilphamari", "Thakurgaon",
    "Panchagarh", "Gaibandha", "Lalmonirhat"
  ],
  Mymensingh: [
    "Mymensingh", "Jamalpur", "Sherpur", "Netrokona"
  ]
};


interface FilePreview {
  url: string;
  file: File;
  type: "image" | "video";
}

export default function ReportPage() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(file => {
      const fileType = file.type.startsWith("image/") ? "image" : "video";
      const url = URL.createObjectURL(file);
      setFiles(prev => [...prev, { url, file, type: fileType }]);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].url);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, time, title, crimeType, division, district, description, files: files.map(f => f.file) });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Report a Crime</CardTitle>
            <CardDescription>Please provide detailed information about the incident</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date of Incident</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}> 
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Time of Incident</Label>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Crime Title</Label>
                <Input
                  type="text"
                  placeholder="Enter crime title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Crime Type</Label>
                <Select value={crimeType} onValueChange={setCrimeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crime type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Theft", "Assault", "Fraud", "Harassment", "Vandalism", "Other"].map((crime) => (
                      <SelectItem key={crime} value={crime}>
                        {crime}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Division</Label>
                <Select value={division} onValueChange={setDivision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map(div => <SelectItem key={div} value={div}>{div}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Select value={district} onValueChange={setDistrict} disabled={!division}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {division && districtsByDivision[division].map(dist => <SelectItem key={dist} value={dist}>{dist}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Provide a detailed description of the incident" className="h-32" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">Submit Report</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

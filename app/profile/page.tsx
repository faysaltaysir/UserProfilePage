"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, ThumbsUp, ArrowBigDown, ArrowBigUp, ThumbsDown, MapPin, Check, X, Camera, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

interface Post {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  likes: number;
  dislikes: number;
}

interface UserData {
  name: string;
  title: string;
  location: string;
  bio: string;
  avatar: string;
  posts: Post[];
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "Sarah Anderson",
    title: "Software Developer",
    location: "San Francisco, CA",
    bio: "Passionate about creating beautiful and functional web applications. Love to explore new technologies and share knowledge with the community.",
    avatar: "E:\photo\me.jpg",
    posts: [
      {
        id: 1,
        title: "Building Modern Web Apps with Next.js",
        location: "Tech Conference Center",
        date: "2024-03-15",
        description: "Shared insights about building scalable applications using Next.js and modern web technologies. The session covered best practices, performance optimization, and real-world examples.",
        likes: 128,
        dislikes: 28,
      },
      {
        id: 2,
        title: "The Future of Web Development",
        location: "Virtual Meetup",
        date: "2024-03-10",
        description: "Discussed emerging trends in web development, including AI integration, WebAssembly, and the evolution of frontend frameworks.",
        likes: 95,
        dislikes: 8,
      },
    ],
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [tempUserData, setTempUserData] = useState<UserData>(userData);
  const [tempPost, setTempPost] = useState<Post | null>(null);

  const handleProfileEdit = () => {
    setTempUserData(userData);
    setEditingProfile(true);
  };

  const handleProfileSave = () => {
    setUserData(tempUserData);
    setEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setEditingProfile(false);
  };

  const handlePostEdit = (post: Post) => {
    setTempPost({ ...post });
    setEditingPost(post.id);
  };

  const handlePostSave = () => {
    if (tempPost) {
      setUserData(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === tempPost.id ? tempPost : post
        ),
      }));
      setEditingPost(null);
      setTempPost(null);
    }
  };

  const handlePostCancel = () => {
    setEditingPost(null);
    setTempPost(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempUserData(prev => ({ ...prev, avatar: imageUrl }));
      if (!editingProfile) {
        setUserData(prev => ({ ...prev, avatar: imageUrl }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative group">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image
                    src={editingProfile ? tempUserData.avatar : userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={handleImageClick}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                {editingProfile ? (
                  <div className="space-y-4">
                    <Input
                      value={tempUserData.name}
                      onChange={(e) => setTempUserData({ ...tempUserData, name: e.target.value })}
                      placeholder="Name"
                      className="text-2xl font-bold text-center"
                    />
                    <Input
                      value={tempUserData.title}
                      onChange={(e) => setTempUserData({ ...tempUserData, title: e.target.value })}
                      placeholder="Title"
                      className="text-xl"
                    />
                    <Input
                      value={tempUserData.location}
                      onChange={(e) => setTempUserData({ ...tempUserData, location: e.target.value })}
                      placeholder="Location"
                    />
                    <Textarea
                      value={tempUserData.bio}
                      onChange={(e) => setTempUserData({ ...tempUserData, bio: e.target.value })}
                      placeholder="Bio"
                      className="h-24"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={handleProfileCancel}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" onClick={handleProfileSave}>
                        <Check className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center md:justify-start items-start">
                      <h1 className="text-3xl font-bold mb-2 text-md-center">{userData.name}</h1>
                      <Button variant="ghost" size="icon" onClick={handleProfileEdit}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xl text-muted-foreground mb-4">{userData.title}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{userData.location}</span>
                    </div>
                    <p className="text-muted-foreground">{userData.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Posts</h2>
          {userData.posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="relative">
                {editingPost === post.id && tempPost ? (
                  <div className="space-y-4">
                    <Input
                      value={tempPost.title}
                      onChange={(e) => setTempPost({ ...tempPost, title: e.target.value })}
                      placeholder="Post title"
                      className="text-xl font-semibold"
                    />
                    <Input
                      value={tempPost.location}
                      onChange={(e) => setTempPost({ ...tempPost, location: e.target.value })}
                      placeholder="Location"
                    />
                    <Textarea
                      value={tempPost.description}
                      onChange={(e) => setTempPost({ ...tempPost, description: e.target.value })}
                      placeholder="Description"
                      className="h-24"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={handlePostCancel}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" onClick={handlePostSave}>
                        <Check className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {post.location}
                          </div>
                          <div>{new Date(post.date).toLocaleDateString("en-US")}</div>
                          
                          {/* <div className="flex items-center gap-1">
                            <ArrowBigUp className="h-4 w-4 text-destructive" />
                              {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="h-4 w-4 text-destructive" />
                              {post.dislikes}
                          </div> */}
                          {/* Interaction buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-green-600 hover:text-green-700"
              >
                <ArrowBigUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                <span className="text-xs sm:text-sm">{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-red-600 hover:text-red-700"
              >
              <ArrowBigDown className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                <span className="text-xs sm:text-sm">{post.dislikes}</span>
              </Button>
              <div className="flex items-center text-muted-foreground">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs sm:text-sm">{post.dislikes}</span>
              </div>
            </div>

                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handlePostEdit(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="px-0">
                      <p className="text-muted-foreground">{post.description}</p>
                    </CardContent>
                  </div>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
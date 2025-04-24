import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
          <CardDescription>Number of projects in progress</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">12</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
          <CardDescription>Successfully completed projects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">8</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>In Progress</CardTitle>
          <CardDescription>Currently active projects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">3</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>On Hold</CardTitle>
          <CardDescription>Temporarily paused projects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">1</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects; 
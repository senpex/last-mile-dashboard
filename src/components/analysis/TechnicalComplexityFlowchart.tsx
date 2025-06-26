
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowRight, Clock, Database, Zap, Users, MapPin, CreditCard, MessageSquare, FileText, BarChart3, Settings } from "lucide-react";

export const TechnicalComplexityFlowchart = () => {
  const complexityLevels = [
    {
      level: "HIGH COMPLEXITY",
      duration: "6-8 weeks",
      color: "bg-red-100 border-red-300 text-red-800",
      iconColor: "text-red-600",
      items: [
        {
          icon: MessageSquare,
          title: "Real-time Communication System",
          description: "Multi-party chat (drivers, customers, dispatchers)",
          technical: "WebSocket/Socket.io, message queuing, online presence"
        },
        {
          icon: MapPin,
          title: "Live GPS Tracking & Routing",
          description: "Real-time driver location, route optimization",
          technical: "Google Maps API, GPS streaming, geofencing"
        },
        {
          icon: Zap,
          title: "Real-time Dashboard Updates",
          description: "Live status changes, notifications, data sync",
          technical: "Event-driven architecture, pub/sub system"
        }
      ]
    },
    {
      level: "MEDIUM COMPLEXITY",
      duration: "3-5 weeks",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      iconColor: "text-yellow-600",
      items: [
        {
          icon: Database,
          title: "Order Management System",
          description: "CRUD operations, status workflows, history tracking",
          technical: "RESTful APIs, state management, data validation"
        },
        {
          icon: Users,
          title: "User Management (Drivers/Clients)",
          description: "Registration, profiles, roles, permissions",
          technical: "Authentication, authorization, user roles"
        },
        {
          icon: CreditCard,
          title: "Payment Processing",
          description: "Transaction handling, payment methods",
          technical: "Stripe/PayPal integration, webhook handling"
        },
        {
          icon: FileText,
          title: "Document Management",
          description: "File uploads, document verification",
          technical: "File storage (AWS S3), document processing"
        }
      ]
    },
    {
      level: "LOW COMPLEXITY",
      duration: "1-2 weeks",
      color: "bg-green-100 border-green-300 text-green-800",
      iconColor: "text-green-600",
      items: [
        {
          icon: BarChart3,
          title: "Dashboard Analytics",
          description: "Statistics, charts, reports",
          technical: "Data aggregation, chart libraries"
        },
        {
          icon: Settings,
          title: "Configuration & Settings",
          description: "System settings, user preferences",
          technical: "Configuration management, preferences storage"
        },
        {
          icon: Clock,
          title: "Basic CRUD Operations",
          description: "Create, read, update, delete operations",
          technical: "Standard database operations, form handling"
        }
      ]
    }
  ];

  const backendOptions = [
    {
      title: "PHP Backend Adaptation",
      duration: "3-4 weeks",
      description: "Modify existing system",
      pros: ["Faster initial setup", "Leverage existing code", "Lower initial cost"],
      cons: ["Technical debt", "Limited scalability", "Harder maintenance"],
      recommendation: "Short-term solution"
    },
    {
      title: "Node.js Rewrite",
      duration: "6-8 weeks",
      description: "Build from scratch",
      pros: ["Modern architecture", "Better scalability", "Easier maintenance", "Real-time capabilities"],
      cons: ["Longer development time", "Higher initial investment"],
      recommendation: "Recommended for long-term"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Technical Complexity Assessment</h1>
        <p className="text-muted-foreground">Based on dashboard functionality analysis</p>
      </div>

      {/* Complexity Levels */}
      <div className="space-y-6">
        {complexityLevels.map((level, levelIndex) => (
          <div key={level.level} className="relative">
            <Card className={`border-2 ${level.color}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className={`h-5 w-5 ${level.iconColor}`} />
                    {level.level}
                  </CardTitle>
                  <Badge variant="outline" className={level.color}>
                    {level.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {level.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-3">
                      <item.icon className={`h-5 w-5 mt-1 ${level.iconColor}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                        <p className="text-xs text-blue-600 font-mono">{item.technical}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Arrow between levels */}
            {levelIndex < complexityLevels.length - 1 && (
              <div className="flex justify-center my-4">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Backend Options Comparison */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Implementation Strategy</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {backendOptions.map((option, index) => (
            <Card key={index} className={`border-2 ${index === 1 ? 'border-blue-300 bg-blue-50' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {option.title}
                  <Badge variant={index === 1 ? "default" : "secondary"}>
                    {option.duration}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="text-sm space-y-1">
                    {option.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="text-sm space-y-1">
                    {option.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <Badge variant={index === 1 ? "default" : "outline"}>
                    {option.recommendation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="mt-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-center text-blue-800">
            Recommended Timeline: 6-8 weeks (Node.js)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">6-8 weeks</div>
              <div className="text-sm text-muted-foreground">High Complexity Features</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">3-5 weeks</div>
              <div className="text-sm text-muted-foreground">Medium Complexity Features</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">1-2 weeks</div>
              <div className="text-sm text-muted-foreground">Low Complexity Features</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

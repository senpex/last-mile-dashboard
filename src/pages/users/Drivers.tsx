import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search, MessageCircle, ChevronDown, Check, X, Clock, Pencil, FileText, Filter } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis, PaginationInfo, PaginationSize } from "@/components/ui/pagination";
import CourierChat from '@/components/chat/CourierChat';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DeliveryFilters } from '@/components/deliveries/DeliveryFilters';

[... rest of the original code until the filter sidebar div ...]

{isFilterSidebarOpen && (
  <div className="min-w-[240px] max-w-[240px] border-r bg-background mr-5 pl-5">
    <div className="p-4">
      <h3 className="font-medium mb-3">Filter Drivers</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Status</h4>
          <div className="space-y-2">
            {['online', 'offline', 'busy'].map(status => (
              <div key={status} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`status-${status}`} 
                  className="h-4 w-4 rounded border-gray-300 mr-2"
                />
                <label htmlFor={`status-${status}`} className="text-sm">
                  {statusDictionary[status] || status}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Hire Status</h4>
          <div className="space-y-2">
            {Object.keys(hireStatusDictionary).map(status => (
              <div key={status} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`hire-status-${status}`} 
                  className="h-4 w-4 rounded border-gray-300 mr-2"
                />
                <label htmlFor={`hire-status-${status}`} className="text-sm">
                  {hireStatusDictionary[status]}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Transport Type</h4>
          <div className="space-y-2">
            {Object.entries(transportTypes).map(([id, name]) => (
              <div key={id} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`transport-${id}`} 
                  className="h-4 w-4 rounded border-gray-300 mr-2"
                />
                <label htmlFor={`transport-${id}`} className="text-sm flex items-center gap-1.5">
                  <TransportIcon 
                    transportType={id as TransportType} 
                    size={12} 
                    className="h-[12px] w-[12px]" 
                  />
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

[... rest of the original code until the end ...]

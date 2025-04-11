import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search, MessageCircle, ChevronDown, Check, X, Clock, Pencil, FileText } from "lucide-react";
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

[... rest of the original code until renderCellContent function ...]

const renderCellContent = (driver: any, columnId: string) => {
  switch (columnId) {
    case "id":
      return driver.id;
    case "name":
      return driver.name;
    case "email":
      return driver.email;
    case "phone":
      return (
        <span className="block truncate max-w-[150px]">
          {driver.phone}
        </span>
      );
    case "zipcode":
      return driver.zipcode;
    case "transport":
      return (
        <div className="flex items-center gap-2">
          {driver.transports.map((transportId: string) => (
            <div 
              key={transportId} 
              className="flex items-center justify-center p-2 rounded-md bg-muted" 
              title={transportTypes[transportId] || `Transport ID: ${transportId}`}
            >
              <TransportIcon 
                transportType={transportId as TransportType} 
                size={14} 
                className="h-[14px] w-[14px]" 
              />
            </div>
          ))}
        </div>
      );
    case "rating":
      return renderRating(driver.rating);
    case "status":
      return renderStatus(driver.status);
    case "hireStatus":
      return renderHireStatus(driver.hireStatus, driver.id);
    case "stripeStatus":
      return renderStripeStatus(driver.stripeStatus);
    case "notes":
      if (editingNotes === driver.id) {
        return (
          <div className="flex flex-col gap-2">
            <Textarea 
              placeholder="Add notes about this driver..." 
              className="min-h-[80px] text-sm"
              value={driver.notes || ''}
              onChange={(e) => handleNotesChange(driver.id, e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 px-2 text-xs" 
                onClick={() => setEditingNotes(null)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="h-7 px-2 text-xs" 
                onClick={() => saveNotes(driver.id)}
              >
                Save
              </Button>
            </div>
          </div>
        );
      } else {
        return (
          <div 
            className="relative cursor-pointer group flex items-start gap-1" 
            onClick={() => handleNotesClick(driver.id)}
          >
            <FileText size={14} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              {driver.notes ? (
                <p className={cn(
                  "text-sm max-w-[200px] truncate overflow-hidden whitespace-nowrap",
                  "group-hover:text-primary transition-colors"
                )}>
                  {driver.notes}
                </p>
              ) : (
                <p className="text-muted-foreground italic text-xs group-hover:text-primary transition-colors">
                  Click to add notes
                </p>
              )}
            </div>
          </div>
        );
      }
    case "actions":
      return (
        <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
          View
        </Button>
      );
    default:
      return null;
  }
};

[... rest of the original code until the end ...]

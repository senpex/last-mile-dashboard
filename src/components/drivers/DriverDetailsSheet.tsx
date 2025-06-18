import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Phone, Mail, MapPin, Star, FileText, CreditCard, User, Award, Settings, File, Image, Edit, Save, X, Plus, Trash2, Upload, Eye, ChevronDown, Building } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OrderDetailsSheet } from "@/components/deliveries/OrderDetailsSheet";
import { deliveriesData } from "@/data/deliveriesData";
import { EmailsSentList } from "./EmailsSentList";
interface VehicleInfo {
  transportId: string;
  year?: string;
  make?: string;
  model?: string;
  plateNumber?: string;
  plateImage?: string;
}
interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  address: string;
  transports: string[];
  rating: number;
  status: string;
  hireStatus: string;
  stripeStatus: 'verified' | 'unverified' | 'pending';
  notes: string;
  profileTypes: string[];
  verifiedByDriver?: 'Verified' | 'Not verified';
  approvedByAdmin?: 'approved' | 'disapproved' | 'pending';
  vehicleInfo?: VehicleInfo[];
  twoStepVerification?: 'yes' | 'no';
  driverControl?: 'yes' | 'no';
  planning?: 'enabled' | 'disabled';
  banned?: 'yes' | 'no';
  dedicatedCompanies?: string[];
}
interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  transportTypes: {
    [key: string]: string;
  };
  statusDictionary: {
    [key: string]: string;
  };
  hireStatusDictionary: {
    [key: string]: string;
  };
  renderStatus: (statusId: string) => JSX.Element;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => JSX.Element;
}
export const DriverDetailsSheet = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  renderStatus,
  renderStripeStatus
}: DriverDetailsSheetProps) => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedTransportToAdd, setSelectedTransportToAdd] = useState<string>('');
  const [selectedCompanyToAdd, setSelectedCompanyToAdd] = useState<string>('');
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("driver-info");
  const [activeLogTab, setActiveLogTab] = useState<string>("payment-history");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [flaggedOrders, setFlaggedOrders] = useState<Set<number>>(new Set());

  // Editing states
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedData, setEditedData] = useState({
    firstName: driver?.name.split(' ')[0] || '',
    lastName: driver?.name.split(' ').slice(1).join(' ') || '',
    email: driver?.email || '',
    phone: driver?.phone || '',
    zipcode: driver?.zipcode || '',
    address: driver?.address || '',
    notes: driver?.notes || '',
    rating: driver?.rating || 0,
    hireStatus: driver?.hireStatus || '',
    stripeStatus: driver?.stripeStatus || 'unverified' as const,
    verifiedByDriver: driver?.verifiedByDriver || 'Not verified' as const,
    approvedByAdmin: driver?.approvedByAdmin || 'pending' as const,
    profileTypes: driver?.profileTypes || [],
    transports: driver?.transports || [],
    vehicleInfo: driver?.vehicleInfo || [],
    twoStepVerification: driver?.twoStepVerification || 'no' as const,
    driverControl: driver?.driverControl || 'no' as const,
    planning: driver?.planning || 'disabled' as const,
    banned: driver?.banned || 'no' as const,
    dedicatedCompanies: driver?.dedicatedCompanies || []
  });
  if (!driver) return null;

  // Available profile types
  const availableProfileTypes = ['Driver', 'Mover', 'Helper'];

  // Available transport types - get all available transport types from the dictionary
  const availableTransportTypes = Object.keys(transportTypes);

  // Available dedicated companies
  const availableCompanies = ['Amazon Logistics', 'FedEx Ground', 'UPS', 'DHL Express', 'USPS', 'OnTrac', 'LaserShip', 'Blue Dart', 'Aramex', 'TNT Express'];

  // Sample documents data - in a real app this would come from the driver data
  const documents = [{
    id: 1,
    name: "Driver's License - Front",
    type: "Image",
    uploadDate: "2024-01-15",
    status: "Verified"
  }, {
    id: 2,
    name: "Driver's License - Back",
    type: "Image",
    uploadDate: "2024-01-12",
    status: "Pending"
  }, {
    id: 4,
    name: "Insurance Certificate",
    type: "Image",
    uploadDate: "2024-01-08",
    status: "Verified"
  }];

  // Get actual delivery data for this driver
  const getDeliveriesForDriver = () => {
    return deliveriesData.filter(delivery => delivery.courier === driver.name);
  };
  const driverDeliveries = getDeliveriesForDriver();

  // Sample payout data with real delivery order numbers
  const payoutRecords = [{
    id: 1,
    date: "2024-01-15",
    amount: 425.50,
    status: "paid",
    transactions: [{
      orderId: driverDeliveries[0]?.id || 1,
      orderNumber: driverDeliveries[0]?.id || "100001",
      date: "2024-01-14",
      earning: 85.00,
      commission: 12.75,
      tip: 15.00
    }, {
      orderId: driverDeliveries[1]?.id || 2,
      orderNumber: driverDeliveries[1]?.id || "100002",
      date: "2024-01-14",
      earning: 120.00,
      commission: 18.00,
      tip: 25.00
    }, {
      orderId: driverDeliveries[2]?.id || 3,
      orderNumber: driverDeliveries[2]?.id || "100003",
      date: "2024-01-15",
      earning: 95.50,
      commission: 14.33,
      tip: 20.00
    }, {
      orderId: driverDeliveries[3]?.id || 4,
      orderNumber: driverDeliveries[3]?.id || "100004",
      date: "2024-01-15",
      earning: 110.00,
      commission: 16.50,
      tip: 18.92
    }]
  }, {
    id: 2,
    date: "2024-01-08",
    amount: 312.75,
    status: "paid",
    transactions: [{
      orderId: driverDeliveries[4]?.id || 5,
      orderNumber: driverDeliveries[4]?.id || "100005",
      date: "2024-01-07",
      earning: 75.00,
      commission: 11.25,
      tip: 12.00
    }, {
      orderId: driverDeliveries[5]?.id || 6,
      orderNumber: driverDeliveries[5]?.id || "100006",
      date: "2024-01-08",
      earning: 90.00,
      commission: 13.50,
      tip: 22.50
    }, {
      orderId: driverDeliveries[6]?.id || 7,
      orderNumber: driverDeliveries[6]?.id || "100007",
      date: "2024-01-08",
      earning: 88.50,
      commission: 13.28,
      tip: 0.00
    }]
  }, {
    id: 3,
    date: "2024-01-01",
    amount: 198.25,
    status: "paid",
    transactions: [{
      orderId: driverDeliveries[7]?.id || 8,
      orderNumber: driverDeliveries[7]?.id || "100008",
      date: "2023-12-31",
      earning: 65.00,
      commission: 9.75,
      tip: 8.00
    }, {
      orderId: driverDeliveries[8]?.id || 9,
      orderNumber: driverDeliveries[8]?.id || "100009",
      date: "2024-01-01",
      earning: 115.50,
      commission: 17.33,
      tip: 0.00
    }]
  }];

  // Sample upcoming payment data with real delivery order numbers
  const upcomingPayment = {
    id: 'upcoming-1',
    date: "2024-01-22",
    amount: 285.75,
    status: "pending",
    transactions: [{
      orderId: driverDeliveries[9]?.id || 10,
      orderNumber: driverDeliveries[9]?.id || "100010",
      date: "2024-01-20",
      earning: 95.00,
      commission: 14.25,
      tip: 20.00
    }, {
      orderId: driverDeliveries[10]?.id || 11,
      orderNumber: driverDeliveries[10]?.id || "100011",
      date: "2024-01-21",
      earning: 80.50,
      commission: 12.08,
      tip: 15.00
    }, {
      orderId: driverDeliveries[11]?.id || 12,
      orderNumber: driverDeliveries[11]?.id || "100012",
      date: "2024-01-21",
      earning: 105.00,
      commission: 15.75,
      tip: 12.92
    }]
  };
  const handleViewDocument = (document: typeof documents[0]) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };
  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
  };
  const hireStatusOptions = Object.entries(hireStatusDictionary).map(([key, value]) => ({
    value: key,
    label: value
  }));
  const handleEdit = (section: string) => {
    setEditingSection(section);
    setSelectedTransportToAdd('');
    setSelectedCompanyToAdd('');

    // Initialize vehicle info for all existing transports when editing transports section
    let initialVehicleInfo = driver.vehicleInfo || [];
    if (section === 'transports') {
      // Ensure every transport has a vehicle info entry
      const existingTransportIds = initialVehicleInfo.map(info => info.transportId);
      const missingTransports = driver.transports.filter(transportId => !existingTransportIds.includes(transportId));

      // Add vehicle info entries for transports that don't have them
      const newVehicleInfoEntries = missingTransports.map(transportId => ({
        transportId,
        year: '',
        make: '',
        model: '',
        plateNumber: '',
        plateImage: ''
      }));
      initialVehicleInfo = [...initialVehicleInfo, ...newVehicleInfoEntries];
    }

    // Reset edited data to current driver data
    setEditedData({
      firstName: driver.name.split(' ')[0] || '',
      lastName: driver.name.split(' ').slice(1).join(' ') || '',
      email: driver.email,
      phone: driver.phone,
      zipcode: driver.zipcode,
      address: driver.address,
      notes: driver.notes,
      rating: driver.rating,
      hireStatus: driver.hireStatus,
      stripeStatus: driver.stripeStatus,
      verifiedByDriver: driver.verifiedByDriver || 'Not verified',
      approvedByAdmin: driver.approvedByAdmin || 'pending',
      profileTypes: driver.profileTypes || [],
      transports: driver.transports || [],
      vehicleInfo: initialVehicleInfo,
      twoStepVerification: driver.twoStepVerification || 'no',
      driverControl: driver.driverControl || 'no',
      planning: driver.planning || 'disabled',
      banned: driver.banned || 'no',
      dedicatedCompanies: driver.dedicatedCompanies || []
    });
  };
  const handleSave = (section: string) => {
    // Save the edited data back to the driver object
    if (section === 'companies') {
      // Update the driver's dedicated companies
      driver.dedicatedCompanies = [...editedData.dedicatedCompanies];
      console.log('Saved dedicated companies:', driver.dedicatedCompanies);
    }
    setEditingSection(null);
    setSelectedTransportToAdd('');
    setSelectedCompanyToAdd('');
    toast.success(`${section} updated successfully`);
  };
  const handleCancel = () => {
    setEditingSection(null);
    setSelectedTransportToAdd('');
    setSelectedCompanyToAdd('');
    // Reset edited data to original values
    setEditedData({
      firstName: driver.name.split(' ')[0] || '',
      lastName: driver.name.split(' ').slice(1).join(' ') || '',
      email: driver.email,
      phone: driver.phone,
      zipcode: driver.zipcode,
      address: driver.address,
      notes: driver.notes,
      rating: driver.rating,
      hireStatus: driver.hireStatus,
      stripeStatus: driver.stripeStatus,
      verifiedByDriver: driver.verifiedByDriver || 'Not verified',
      approvedByAdmin: driver.approvedByAdmin || 'pending',
      profileTypes: driver.profileTypes || [],
      transports: driver.transports || [],
      vehicleInfo: driver.vehicleInfo || [],
      twoStepVerification: driver.twoStepVerification || 'no',
      driverControl: driver.driverControl || 'no',
      planning: driver.planning || 'disabled',
      banned: driver.banned || 'no',
      dedicatedCompanies: driver.dedicatedCompanies || []
    });
  };
  const handleInputChange = (field: string, value: string | number | string[] | VehicleInfo[]) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleProfileTypeChange = (profileType: string, checked: boolean) => {
    const currentTypes = editedData.profileTypes;
    if (checked) {
      setEditedData(prev => ({
        ...prev,
        profileTypes: [...currentTypes, profileType]
      }));
    } else {
      setEditedData(prev => ({
        ...prev,
        profileTypes: currentTypes.filter(type => type !== profileType)
      }));
    }
  };
  const handleAddTransport = () => {
    if (selectedTransportToAdd && !editedData.transports.includes(selectedTransportToAdd)) {
      const newTransports = [...editedData.transports, selectedTransportToAdd];
      const newVehicleInfo = [...editedData.vehicleInfo, {
        transportId: selectedTransportToAdd,
        year: '',
        make: '',
        model: '',
        plateNumber: '',
        plateImage: ''
      }];
      setEditedData(prev => ({
        ...prev,
        transports: newTransports,
        vehicleInfo: newVehicleInfo
      }));
      setSelectedTransportToAdd('');
    }
  };
  const handleRemoveTransport = (transportId: string) => {
    const newTransports = editedData.transports.filter(id => id !== transportId);
    const newVehicleInfo = editedData.vehicleInfo.filter(info => info.transportId !== transportId);
    setEditedData(prev => ({
      ...prev,
      transports: newTransports,
      vehicleInfo: newVehicleInfo
    }));
  };
  const handleVehicleInfoChange = (transportId: string, field: keyof VehicleInfo, value: string) => {
    const newVehicleInfo = editedData.vehicleInfo.map(info => info.transportId === transportId ? {
      ...info,
      [field]: value
    } : info);
    setEditedData(prev => ({
      ...prev,
      vehicleInfo: newVehicleInfo
    }));
  };
  const getVehicleInfo = (transportId: string) => {
    return editedData.vehicleInfo.find(info => info.transportId === transportId) || {
      transportId,
      year: '',
      make: '',
      model: '',
      plateNumber: '',
      plateImage: ''
    };
  };
  const handleImageUpload = (transportId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a local URL for the image preview
      const imageUrl = URL.createObjectURL(file);
      handleVehicleInfoChange(transportId, 'plateImage', imageUrl);
      toast.success('Image uploaded successfully');
    }
  };
  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };
  const handleCloseImageModal = () => {
    setExpandedImage(null);
  };
  const handleOrderClick = (orderId: number) => {
    // Find the delivery by ID
    const delivery = deliveriesData.find(d => d.id === orderId);
    if (delivery) {
      setSelectedOrderId(orderId);
      setIsOrderDetailsOpen(true);
    } else {
      toast.error(`Order #${orderId} not found`);
    }
  };
  const handleCloseOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrderId(null);
  };
  const handleOrderFlag = (orderId: number, isFlagged: boolean) => {
    setFlaggedOrders(prev => {
      const newSet = new Set(prev);
      if (isFlagged) {
        newSet.add(orderId);
      } else {
        newSet.delete(orderId);
      }
      return newSet;
    });
  };
  const handleAddCompany = () => {
    if (selectedCompanyToAdd && !editedData.dedicatedCompanies.includes(selectedCompanyToAdd)) {
      const newCompanies = [...editedData.dedicatedCompanies, selectedCompanyToAdd];
      setEditedData(prev => ({
        ...prev,
        dedicatedCompanies: newCompanies
      }));
      setSelectedCompanyToAdd('');
    }
  };
  const handleRemoveCompany = (company: string) => {
    const newCompanies = editedData.dedicatedCompanies.filter(c => c !== company);
    setEditedData(prev => ({
      ...prev,
      dedicatedCompanies: newCompanies
    }));
  };
  return <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
          {/* Main Content with Flex Structure */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Header */}
            <SheetHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <SheetTitle className="text-left text-lg">{driver.name}</SheetTitle>
                    <SheetDescription className="text-left text-sm">
                      Driver ID: {driver.id}
                    </SheetDescription>
                  </div>
                </div>
              </div>
            </SheetHeader>

            {/* Tabs */}
            <Tabs defaultValue="driver-info" className="w-full flex-1 overflow-hidden" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mx-6 mb-2 mt-2 sticky top-0 z-10 bg-background">
                <TabsTrigger value="driver-info">Driver Info</TabsTrigger>
                <TabsTrigger value="driver-logs">Driver Logs</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden">
                <TabsContent value="driver-info" className="m-0 h-full">
                  <ScrollArea className="h-[calc(100vh-220px)]">
                    <div className="p-6 space-y-6 pb-96">
                      {/* Status Information */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Status & Rating
                          </h3>
                          {editingSection === 'status' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('Status & Rating')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('status')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="space-y-4 pt-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Current Status</Label>
                                <div className="mt-1">
                                  {renderStatus(driver.status)}
                                </div>
                              </div>
                              <div>
                                <Label>Hire Status</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <Select value={editedData.hireStatus} onValueChange={value => handleInputChange('hireStatus', value)}>
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {hireStatusOptions.map(option => <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                          </SelectItem>)}
                                      </SelectContent>
                                    </Select> : <Badge variant="secondary">
                                      {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                                    </Badge>}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="flex items-center gap-2">
                                  <Star className="h-4 w-4" />
                                  Rating
                                </Label>
                                <div className="mt-1">
                                  <div className="text-lg font-semibold">
                                    {driver.rating.toFixed(1)} / 5.0
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4" />
                                  Stripe Status
                                </Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <Select value={editedData.stripeStatus} onValueChange={value => handleInputChange('stripeStatus', value)}>
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="unverified">Unverified</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="verified">Verified</SelectItem>
                                      </SelectContent>
                                    </Select> : renderStripeStatus(driver.stripeStatus)}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Verified by Driver</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <Select value={editedData.verifiedByDriver} onValueChange={value => handleInputChange('verifiedByDriver', value)}>
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Verified">Verified</SelectItem>
                                        <SelectItem value="Not verified">Not verified</SelectItem>
                                      </SelectContent>
                                    </Select> : <Badge variant={driver.verifiedByDriver === 'Verified' ? 'default' : 'secondary'}>
                                      {driver.verifiedByDriver || 'Not verified'}
                                    </Badge>}
                                </div>
                              </div>
                              <div>
                                <Label>Approved by Admin</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <Select value={editedData.approvedByAdmin} onValueChange={value => handleInputChange('approvedByAdmin', value)}>
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="disapproved">Disapproved</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                      </SelectContent>
                                    </Select> : <Badge variant={driver.approvedByAdmin === 'approved' ? 'default' : driver.approvedByAdmin === 'disapproved' ? 'destructive' : 'secondary'}>
                                      {driver.approvedByAdmin || 'Pending'}
                                    </Badge>}
                                </div>
                              </div>
                            </div>
                            
                            {/* New Fields */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Two Step Verification</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <RadioGroup value={editedData.twoStepVerification} onValueChange={value => handleInputChange('twoStepVerification', value)} className="flex gap-4">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="two-step-yes" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="two-step-yes" className="text-sm font-normal text-gray-600">Yes</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="two-step-no" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="two-step-no" className="text-sm font-normal text-gray-600">No</Label>
                                      </div>
                                    </RadioGroup> : <span className="text-sm">
                                      {driver.twoStepVerification === 'yes' ? 'Yes' : 'No'}
                                    </span>}
                                </div>
                              </div>
                              <div>
                                <Label>Driver Control</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <RadioGroup value={editedData.driverControl} onValueChange={value => handleInputChange('driverControl', value)} className="flex gap-4">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="driver-control-yes" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="driver-control-yes" className="text-sm font-normal text-gray-600">Yes</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="driver-control-no" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="driver-control-no" className="text-sm font-normal text-gray-600">No</Label>
                                      </div>
                                    </RadioGroup> : <span className="text-sm">
                                      {driver.driverControl === 'yes' ? 'Yes' : 'No'}
                                    </span>}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Planning</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <RadioGroup value={editedData.planning === 'enabled' ? 'yes' : 'no'} onValueChange={value => handleInputChange('planning', value === 'yes' ? 'enabled' : 'disabled')} className="flex gap-4">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="planning-yes" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="planning-yes" className="text-sm font-normal text-gray-600">Yes</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="planning-no" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="planning-no" className="text-sm font-normal text-gray-600">No</Label>
                                      </div>
                                    </RadioGroup> : <span className="text-sm">
                                      {driver.planning === 'enabled' ? 'Yes' : 'No'}
                                    </span>}
                                </div>
                              </div>
                              <div>
                                <Label>Banned</Label>
                                <div className="mt-1">
                                  {editingSection === 'status' ? <RadioGroup value={editedData.banned} onValueChange={value => handleInputChange('banned', value)} className="flex gap-4">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="banned-yes" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="banned-yes" className="text-sm font-normal text-gray-600">Yes</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="banned-no" className="border-gray-500 text-gray-600" />
                                        <Label htmlFor="banned-no" className="text-sm font-normal text-gray-600">No</Label>
                                      </div>
                                    </RadioGroup> : <span className="text-sm">
                                      {driver.banned === 'yes' ? 'Yes' : 'No'}
                                    </span>}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Information
                          </h3>
                          {editingSection === 'contact' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('Contact Information')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('contact')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="space-y-4 pt-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" value={editingSection === 'contact' ? editedData.firstName : driver.name.split(' ')[0] || ''} onChange={e => handleInputChange('firstName', e.target.value)} readOnly={editingSection !== 'contact'} className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'} />
                              </div>
                              <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" value={editingSection === 'contact' ? editedData.lastName : driver.name.split(' ').slice(1).join(' ') || ''} onChange={e => handleInputChange('lastName', e.target.value)} readOnly={editingSection !== 'contact'} className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" value={editingSection === 'contact' ? editedData.phone : driver.phone} onChange={e => handleInputChange('phone', e.target.value)} readOnly={editingSection !== 'contact'} className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'} />
                              </div>
                              <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value={editingSection === 'contact' ? editedData.email : driver.email} onChange={e => handleInputChange('email', e.target.value)} readOnly={editingSection !== 'contact'} className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Location Information */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Location
                          </h3>
                          {editingSection === 'location' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('Location')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('location')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="space-y-4 pt-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="zipcode">Zipcode</Label>
                                <Input id="zipcode" value={editingSection === 'location' ? editedData.zipcode : driver.zipcode} onChange={e => handleInputChange('zipcode', e.target.value)} readOnly={editingSection !== 'location'} className={editingSection !== 'location' ? 'bg-muted/50' : 'bg-background'} />
                              </div>
                              <div>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={editingSection === 'location' ? editedData.address : driver.address} onChange={e => handleInputChange('address', e.target.value)} readOnly={editingSection !== 'location'} className={editingSection !== 'location' ? 'bg-muted/50' : 'bg-background'} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Profile Types */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Profile Types
                          </h3>
                          {editingSection === 'profileTypes' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('Profile Types')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('profileTypes')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="pt-6">
                            {editingSection === 'profileTypes' ? <div className="space-y-3">
                                {availableProfileTypes.map(profileType => <div key={profileType} className="flex items-center space-x-2">
                                    <Checkbox id={`profile-${profileType}`} checked={editedData.profileTypes.includes(profileType)} onCheckedChange={checked => handleProfileTypeChange(profileType, checked as boolean)} />
                                    <Label htmlFor={`profile-${profileType}`} className="text-sm font-normal">
                                      {profileType}
                                    </Label>
                                  </div>)}
                              </div> : <div className="flex flex-wrap gap-2">
                                {driver.profileTypes && driver.profileTypes.length > 0 ? driver.profileTypes.map(type => <Badge key={type} variant="outline">
                                      {type}
                                    </Badge>) : <span className="text-muted-foreground text-sm">No profile types assigned</span>}
                              </div>}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Transport Types */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <Award className="w-4 h-4 mr-2" />
                            Transport Types
                          </h3>
                          {editingSection === 'transports' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('Transport Types')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('transports')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="pt-6">
                            {editingSection === 'transports' ? <div className="space-y-6">
                                {/* Add Transport Type Dropdown */}
                                <div>
                                  <Label>Add Transport Type</Label>
                                  <div className="flex gap-2 mt-1">
                                    <Select value={selectedTransportToAdd} onValueChange={setSelectedTransportToAdd}>
                                      <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Select transport type to add" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {availableTransportTypes.filter(id => !editedData.transports.includes(id)).map(id => <SelectItem key={id} value={id}>
                                              <div className="flex items-center gap-2">
                                                <TransportIcon transportType={id as TransportType} size={16} />
                                                {transportTypes[id] || `Transport ${id}`}
                                              </div>
                                            </SelectItem>)}
                                      </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="sm" onClick={handleAddTransport} disabled={!selectedTransportToAdd} className="px-3">
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Current Transport Types with Vehicle Info */}
                                <div className="space-y-4">
                                  {editedData.transports.map(transportId => {
                                const vehicleInfo = getVehicleInfo(transportId);
                                return <div key={transportId} className="border rounded-lg p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <TransportIcon transportType={transportId as TransportType} size={20} />
                                            <span className="font-medium">
                                              {transportTypes[transportId] || `Transport ${transportId}`}
                                            </span>
                                          </div>
                                          <Button variant="outline" size="sm" onClick={() => handleRemoveTransport(transportId)} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                        
                                        {/* Vehicle Information */}
                                        <div className="grid grid-cols-2 gap-3">
                                          <div>
                                            <Label htmlFor={`year-${transportId}`}>Year</Label>
                                            <Input id={`year-${transportId}`} value={vehicleInfo.year || ''} onChange={e => handleVehicleInfoChange(transportId, 'year', e.target.value)} placeholder="e.g., 2020" className="mt-1" />
                                          </div>
                                          <div>
                                            <Label htmlFor={`make-${transportId}`}>Make</Label>
                                            <Input id={`make-${transportId}`} value={vehicleInfo.make || ''} onChange={e => handleVehicleInfoChange(transportId, 'make', e.target.value)} placeholder="e.g., Ford" className="mt-1" />
                                          </div>
                                          <div>
                                            <Label htmlFor={`model-${transportId}`}>Model</Label>
                                            <Input id={`model-${transportId}`} value={vehicleInfo.model || ''} onChange={e => handleVehicleInfoChange(transportId, 'model', e.target.value)} placeholder="e.g., Transit" className="mt-1" />
                                          </div>
                                          <div>
                                            <Label htmlFor={`plate-${transportId}`}>Plate Number</Label>
                                            <Input id={`plate-${transportId}`} value={vehicleInfo.plateNumber || ''} onChange={e => handleVehicleInfoChange(transportId, 'plateNumber', e.target.value)} placeholder="e.g., ABC-123" className="mt-1" />
                                          </div>
                                        </div>
                                        
                                        {/* Plate Image Upload */}
                                        <div>
                                          <Label htmlFor={`plateImageUpload-${transportId}`}>Plate Image</Label>
                                          <div className="mt-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                              <Input id={`plateImageUpload-${transportId}`} type="file" accept="image/*" onChange={e => handleImageUpload(transportId, e)} className="hidden" />
                                              <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById(`plateImageUpload-${transportId}`)?.click()} className="flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                Upload Image
                                              </Button>
                                            </div>
                                            {vehicleInfo.plateImage && <div className="mt-2 flex items-center gap-2">
                                                <div className="relative cursor-pointer group border rounded overflow-hidden" onClick={() => handleImageClick(vehicleInfo.plateImage)}>
                                                  <img src={vehicleInfo.plateImage} alt="Plate" className="w-16 h-10 object-cover transition-transform group-hover:scale-105" onError={e => {
                                            e.currentTarget.style.display = 'none';
                                          }} />
                                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                                                    <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                  </div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">Click to expand</span>
                                              </div>}
                                          </div>
                                        </div>
                                      </div>;
                              })}
                                </div>

                                {editedData.transports.length === 0 && <div className="text-center py-8 text-muted-foreground">
                                    <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No transport types assigned</p>
                                  </div>}
                              </div> : <div className="flex flex-wrap gap-3">
                                {driver.transports.map(transportId => <div key={transportId} className="flex items-center gap-2 p-2 border rounded-lg">
                                    <TransportIcon transportType={transportId as TransportType} size={16} className="h-4 w-4" />
                                    <span className="text-sm">
                                      {transportTypes[transportId] || `Transport ${transportId}`}
                                    </span>
                                  </div>)}
                              </div>}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Dedicated Companies */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <Building className="w-4 h-4 mr-2" />
                            Dedicated Companies
                          </h3>
                          {editingSection === 'companies' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('companies')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('companies')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="pt-6">
                            {editingSection === 'companies' ? <div className="space-y-4">
                                {/* Add Company Dropdown */}
                                <div>
                                  <Label>Add Company</Label>
                                  <div className="flex gap-2 mt-1">
                                    <Select value={selectedCompanyToAdd} onValueChange={setSelectedCompanyToAdd}>
                                      <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Select company to add" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {availableCompanies.filter(company => !editedData.dedicatedCompanies.includes(company)).map(company => <SelectItem key={company} value={company}>
                                              <div className="flex items-center gap-2">
                                                <Building className="w-4 h-4" />
                                                {company}
                                              </div>
                                            </SelectItem>)}
                                      </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="sm" onClick={handleAddCompany} disabled={!selectedCompanyToAdd} className="px-3">
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Current Companies */}
                                <div className="space-y-2">
                                  {editedData.dedicatedCompanies.map(company => <div key={company} className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <Building className="w-4 h-4" />
                                        <span className="font-medium">{company}</span>
                                      </div>
                                      <Button variant="outline" size="sm" onClick={() => handleRemoveCompany(company)} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>)}
                                </div>

                                {editedData.dedicatedCompanies.length === 0 && <div className="text-center py-8 text-muted-foreground">
                                    <Building className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No dedicated companies assigned</p>
                                  </div>}
                              </div> : <div className="flex flex-wrap gap-3">
                                {(driver.dedicatedCompanies || []).map(company => <div key={company} className="flex items-center gap-2 p-2 border rounded-lg">
                                    <Building className="w-4 h-4" />
                                    <span className="text-sm">{company}</span>
                                  </div>)}
                                {(!driver.dedicatedCompanies || driver.dedicatedCompanies.length === 0) && <div className="text-center py-8 text-muted-foreground w-full">
                                    <Building className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No dedicated companies assigned</p>
                                  </div>}
                              </div>}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Documents */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <File className="w-4 h-4 mr-2" />
                            Documents
                          </h3>
                        </div>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              {documents.map(document => (
                                <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <Image className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm font-medium">{document.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {document.type} • Uploaded {document.uploadDate}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleViewDocument(document)}>
                                      View
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              {documents.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                  <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm">No documents uploaded</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Notes */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Notes
                          </h3>
                          {editingSection === 'notes' ? <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleSave('Notes')} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div> : <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={() => handleEdit('notes')}>
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>}
                        </div>
                        <Card>
                          <CardContent className="pt-6">
                            {editingSection === 'notes' ? <Textarea placeholder="Add notes about this driver..." value={editedData.notes} onChange={e => handleInputChange('notes', e.target.value)} className="min-h-[100px]" /> : <Textarea placeholder="Add notes about this driver..." value={driver.notes || ''} className="min-h-[100px] bg-muted/50" readOnly />}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="driver-logs" className="m-0 h-full">
                  <ScrollArea className="h-[calc(100vh-220px)]">
                    <div className="p-6 px-[23px] pt-0 pb-96">
                      <Tabs defaultValue="payment-history" value={activeLogTab} onValueChange={setActiveLogTab}>
                        <div className="sticky top-0 z-10 bg-background pt-1 pb-2 min-h-[90px]">
                          <TabsList className="flex flex-wrap bg-transparent p-0 py-3 gap-1 justify-start w-full overflow-visible my-0">
                            <TabsTrigger value="payment-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                              <CreditCard className="w-4 h-4" /> 
                              <span className="hidden sm:inline">Payment History</span>
                              <span className="sm:hidden">Payments</span>
                            </TabsTrigger>
                            <TabsTrigger value="delivery-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                              <File className="w-4 h-4" /> 
                              <span className="hidden sm:inline">Delivery History</span>
                              <span className="sm:hidden">Deliveries</span>
                            </TabsTrigger>
                            <TabsTrigger value="vehicle-info" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                              <Award className="w-4 h-4" /> 
                              <span className="hidden sm:inline">Vehicle Info</span>
                              <span className="sm:hidden">Vehicle</span>
                            </TabsTrigger>
                            <TabsTrigger value="communication" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                              <Mail className="w-4 h-4" /> 
                              <span className="hidden sm:inline">Emails sent</span>
                              <span className="sm:hidden">Emails</span>
                            </TabsTrigger>
                            <TabsTrigger value="activity-log" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                              <Settings className="w-4 h-4" /> 
                              <span className="hidden sm:inline">Activity Log</span>
                              <span className="sm:hidden">Activity</span>
                            </TabsTrigger>
                          </TabsList>
                        </div>
                        
                        <div className="mt-4 space-y-4">
                          <TabsContent value="payment-history" className="space-y-4">
                            {/* Upcoming Payment Section */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Upcoming Payment</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <Collapsible>
                                  <CollapsibleTrigger asChild>
                                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                      <div className="flex items-center gap-4">
                                        <div>
                                          <p className="font-medium">{upcomingPayment.date}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {upcomingPayment.transactions.length} transactions
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="text-xs">
                                          Pending
                                        </Badge>
                                        <span className="font-semibold text-lg">
                                          ${upcomingPayment.amount.toFixed(2)}
                                        </span>
                                        <ChevronDown className="h-4 w-4 transition-transform" />
                                      </div>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="mt-2 ml-4 mr-4 mb-2">
                                      <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-muted/30 px-4 py-2 border-b">
                                          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                                            <div>Order Number</div>
                                            <div>Date</div>
                                            <div>Earning</div>
                                            <div>Commission</div>
                                            <div>Tip</div>
                                          </div>
                                        </div>
                                        <div className="divide-y">
                                          {upcomingPayment.transactions.map((transaction, index) => <div key={index} className="px-4 py-3">
                                              <div className="grid grid-cols-5 gap-4 text-sm">
                                                <div className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer underline" onClick={() => handleOrderClick(transaction.orderId)}>
                                                  #{transaction.orderNumber}
                                                </div>
                                                <div>{transaction.date}</div>
                                                <div>${transaction.earning.toFixed(2)}</div>
                                                <div>${transaction.commission.toFixed(2)}</div>
                                                <div>${transaction.tip.toFixed(2)}</div>
                                              </div>
                                            </div>)}
                                        </div>
                                      </div>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </CardContent>
                            </Card>

                            {/* Payment History Section */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Payment History</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {payoutRecords.map(payout => <Collapsible key={payout.id}>
                                      <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                          <div className="flex items-center gap-4">
                                            <div>
                                              <p className="font-medium">{payout.date}</p>
                                              <p className="text-sm text-muted-foreground">
                                                {payout.transactions.length} transactions
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <Badge variant="success" className="text-xs">
                                              Paid
                                            </Badge>
                                            <span className="font-semibold text-lg">
                                              ${payout.amount.toFixed(2)}
                                            </span>
                                            <ChevronDown className="h-4 w-4 transition-transform" />
                                          </div>
                                        </div>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <div className="mt-2 ml-4 mr-4 mb-2">
                                          <div className="border rounded-lg overflow-hidden">
                                            <div className="bg-muted/30 px-4 py-2 border-b">
                                              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                                                <div>Order Number</div>
                                                <div>Date</div>
                                                <div>Earning</div>
                                                <div>Commission</div>
                                                <div>Tip</div>
                                              </div>
                                            </div>
                                            <div className="divide-y">
                                              {payout.transactions.map((transaction, index) => <div key={index} className="px-4 py-3">
                                                  <div className="grid grid-cols-5 gap-4 text-sm">
                                                    <div className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer underline" onClick={() => handleOrderClick(transaction.orderId)}>
                                                      #{transaction.orderNumber}
                                                    </div>
                                                    <div>{transaction.date}</div>
                                                    <div>${transaction.earning.toFixed(2)}</div>
                                                    <div>${transaction.commission.toFixed(2)}</div>
                                                    <div>${transaction.tip.toFixed(2)}</div>
                                                  </div>
                                                </div>)}
                                            </div>
                                          </div>
                                        </div>
                                      </CollapsibleContent>
                                    </Collapsible>)}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="delivery-history" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Delivery History</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">Delivery history content would go here.</p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="vehicle-info" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Vehicle Information</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">Vehicle information content would go here.</p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="communication" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Emails sent</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <EmailsSentList driverName={driver.name} />
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="activity-log" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Activity Log</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">Activity log content would go here.</p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-3 p-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <DocumentViewerModal isOpen={isDocumentModalOpen} onClose={handleCloseDocumentModal} document={selectedDocument} />

      {/* Order Details Sheet */}
      {selectedOrderId && <OrderDetailsSheet isOpen={isOrderDetailsOpen} onClose={handleCloseOrderDetails} delivery={deliveriesData.find(d => d.id === selectedOrderId)} flaggedOrders={flaggedOrders} onOrderFlag={handleOrderFlag} />}

      {/* Image Expansion Modal */}
      <Dialog open={!!expandedImage} onOpenChange={handleCloseImageModal}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Plate Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {expandedImage && <img src={expandedImage} alt="Expanded plate image" className="max-w-full max-h-[70vh] object-contain rounded-lg" onError={e => {
            e.currentTarget.style.display = 'none';
          }} />}
          </div>
        </DialogContent>
      </Dialog>
    </>;
};

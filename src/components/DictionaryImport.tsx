
import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { saveDictionary } from "@/lib/storage";
import { Dictionary, DictionaryItem } from "@/types/dictionary";
import { useToast } from "@/hooks/use-toast";

interface DictionaryImportProps {
  onImportComplete: () => void;
}

const DictionaryImport = ({ onImportComplete }: DictionaryImportProps) => {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        
        // Assume first sheet contains the dictionary data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          toast({
            title: "Import failed",
            description: "The uploaded file doesn't contain any data.",
            variant: "destructive"
          });
          setIsImporting(false);
          return;
        }

        // Process the data and save as dictionary
        processExcelData(jsonData, firstSheetName);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        toast({
          title: "Import failed",
          description: "There was an error processing the Excel file.",
          variant: "destructive"
        });
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      toast({
        title: "Import failed",
        description: "There was an error reading the file.",
        variant: "destructive"
      });
      setIsImporting(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const processExcelData = (jsonData: any[], sheetName: string) => {
    try {
      // Check for required columns: id and value
      const firstRow = jsonData[0];
      
      if (!firstRow.id || !firstRow.value) {
        toast({
          title: "Import failed",
          description: "The Excel file must contain 'id' and 'value' columns.",
          variant: "destructive"
        });
        setIsImporting(false);
        return;
      }

      // Create dictionary items from the Excel data
      const items: DictionaryItem[] = jsonData.map(row => ({
        id: String(row.id),
        value: String(row.value),
        description: row.description ? String(row.description) : undefined
      }));

      // Generate a unique ID for the dictionary
      const dictionaryId = String(Date.now());
      
      // Create and save the new dictionary
      const newDictionary: Dictionary = {
        id: dictionaryId,
        dic_name: sheetName,
        items
      };

      saveDictionary(newDictionary);
      
      toast({
        title: "Import successful",
        description: `Imported ${items.length} items into dictionary '${sheetName}'`,
      });
      
      // Notify parent component to refresh the dictionary list
      onImportComplete();
    } catch (error) {
      console.error("Error processing Excel data:", error);
      toast({
        title: "Import failed",
        description: "There was an error processing the data from the Excel file.",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        id="excel-upload"
        className="hidden"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={isImporting}
      />
      <label htmlFor="excel-upload">
        <Button variant="outline" asChild disabled={isImporting}>
          <span>
            <Upload className="mr-2 h-4 w-4" />
            {isImporting ? "Importing..." : "Import Excel"}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default DictionaryImport;

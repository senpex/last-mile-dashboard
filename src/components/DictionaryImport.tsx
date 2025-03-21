
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
        let jsonData;
        
        // Check if it's a CSV file or Excel file
        if (file.name.toLowerCase().endsWith('.csv')) {
          // Parse CSV
          const csv = XLSX.read(data, { type: "array" });
          const csvSheet = csv.Sheets[csv.SheetNames[0]];
          jsonData = XLSX.utils.sheet_to_json(csvSheet);
        } else {
          // Parse Excel
          const workbook = XLSX.read(data, { type: "array" });
          // Assume first sheet contains the dictionary data
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          jsonData = XLSX.utils.sheet_to_json(worksheet);
        }
        
        if (jsonData.length === 0) {
          toast({
            title: "Import failed",
            description: "The uploaded file doesn't contain any data.",
            variant: "destructive"
          });
          setIsImporting(false);
          return;
        }

        // Process the data with custom columns format
        processFileWithCustomFormat(jsonData);
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: "Import failed",
          description: "There was an error processing the file.",
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

  const processFileWithCustomFormat = (jsonData: any[]) => {
    try {
      // Check for required columns
      const firstRow = jsonData[0];
      
      if (!firstRow.id || !firstRow.dic_name || !firstRow.list_name) {
        toast({
          title: "Import failed",
          description: "The file must contain 'id', 'dic_name', and 'list_name' columns.",
          variant: "destructive"
        });
        setIsImporting(false);
        return;
      }

      // Group items by dic_name to create separate dictionaries
      const dictionariesMap: Record<string, {
        id: string,
        dic_name: string,
        items: DictionaryItem[]
      }> = {};

      jsonData.forEach(row => {
        const dictionaryId = `${row.id}`;
        const dictionaryName = `${row.dic_name}`;
        
        // Create dictionary if it doesn't exist yet
        if (!dictionariesMap[dictionaryId]) {
          dictionariesMap[dictionaryId] = {
            id: dictionaryId,
            dic_name: dictionaryName,
            items: []
          };
        }
        
        // Add item to the dictionary
        dictionariesMap[dictionaryId].items.push({
          id: `${row.list_name.toLowerCase().replace(/\s+/g, '_')}`, // Create ID from list_name
          value: row.list_name,
          description: row.list_short || undefined
        });
      });

      // Convert map to array of dictionaries
      const dictionaries = Object.values(dictionariesMap);
      
      if (dictionaries.length === 0) {
        toast({
          title: "Import failed",
          description: "No valid dictionaries could be created from the file.",
          variant: "destructive"
        });
        setIsImporting(false);
        return;
      }

      // Save each dictionary to storage
      let savedCount = 0;
      dictionaries.forEach(dict => {
        if (dict.items.length > 0) {
          saveDictionary({
            id: dict.id,
            dic_name: dict.dic_name,
            items: dict.items
          });
          savedCount++;
        }
      });
      
      toast({
        title: "Import successful",
        description: `Imported ${savedCount} dictionaries with a total of ${jsonData.length} items`,
      });
      
      // Notify parent component to refresh the dictionary list
      onImportComplete();
    } catch (error) {
      console.error("Error processing data:", error);
      toast({
        title: "Import failed",
        description: "There was an error processing the data from the file.",
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
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        disabled={isImporting}
      />
      <label htmlFor="excel-upload">
        <Button variant="outline" asChild disabled={isImporting}>
          <span>
            <Upload className="mr-2 h-4 w-4" />
            {isImporting ? "Importing..." : "Import File"}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default DictionaryImport;


import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface LogoutButtonProps {
  collapsed?: boolean;
}

const LogoutButton = ({ collapsed = false }: LogoutButtonProps) => {
  const handleLogout = () => {
    // This would typically connect to your authentication system
    toast({
      title: "Logging out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to login page or clear auth state
    console.log("User logged out");
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md", // Reduced gap and padding
        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-all-200 text-sm" // Added text-sm
      )}
      aria-label="Logout"
    >
      <LogOut className="w-4 h-4" /> {/* Reduced icon size */}
      <span 
        className={cn(
          "menu-item-text text-sm", // Added text-sm
          collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        )}
      >
        Logout
      </span>
    </button>
  );
};

export default LogoutButton;

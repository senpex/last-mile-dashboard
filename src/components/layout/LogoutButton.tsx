
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
        "w-full flex items-center gap-3 px-3 py-2 rounded-md",
        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-all-200"
      )}
      aria-label="Logout"
    >
      <LogOut className="w-5 h-5" />
      <span 
        className={cn(
          "menu-item-text",
          collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        )}
      >
        Logout
      </span>
    </button>
  );
};

export default LogoutButton;


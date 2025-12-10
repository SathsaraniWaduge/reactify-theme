import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Shield, Eye, EyeOff, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import bocLogo from "@/assets/boc-logo.svg";
import bocBackground from "@/assets/boc-background.png";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username.trim()) {
      newErrors.username = "AD Username is required";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate AD authentication
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Check for demo credentials
    if (username === "AU001" && password === "2003") {
      toast.success("Demo login successful", {
        description: "Logged in with demonstration account AU001",
      });
      console.log("[AUDIT LOG] Demo account login:", { username, timestamp: new Date().toISOString() });
      onLogin();
    } else if (username && password) {
      // Simulate AD validation (in production, this would call the AD API)
      toast.success("Authentication successful", {
        description: "Welcome to AIIA System",
      });
      onLogin();
    } else {
      toast.error("Authentication failed", {
        description: "Invalid AD credentials. Please try again.",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex min-h-screen bg-background">
      {/* Left Panel - Bank of Ceylon Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 33, 0.95) 0%, rgba(36, 31, 33, 0.9) 100%)`,
        }}
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${bocBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* BOC Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={bocLogo} 
              alt="Bank of Ceylon Logo" 
              className="h-16 w-auto"
            />
          </div>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Welcome to the Secure
              <span className="block text-[#ffcb03]">Internal Audit Portal</span>
            </h1>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              Access Bank of Ceylon's comprehensive audit management platform. 
              Streamline your audit workflows with enterprise-grade security and efficiency.
            </p>
          </div>
          
          {/* Security Features */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-center gap-3 text-white/70">
              <div className="p-2 rounded-lg bg-[#ffcb03]/20">
                <Shield className="h-5 w-5 text-[#ffcb03]" />
              </div>
              <span className="text-sm">Active Directory Integration</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="p-2 rounded-lg bg-[#ffcb03]/20">
                <Lock className="h-5 w-5 text-[#ffcb03]" />
              </div>
              <span className="text-sm">256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="p-2 rounded-lg bg-[#ffcb03]/20">
                <CheckCircle2 className="h-5 w-5 text-[#ffcb03]" />
              </div>
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="p-2 rounded-lg bg-[#ffcb03]/20">
                <User className="h-5 w-5 text-[#ffcb03]" />
              </div>
              <span className="text-sm">Role-Based Access</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Bank of Ceylon. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-white">
        {/* Mobile BOC Logo */}
        <div className="lg:hidden flex justify-center mb-8">
          <img 
            src={bocLogo} 
            alt="Bank of Ceylon Logo" 
            className="h-12 w-auto"
          />
        </div>
        
        {/* AIIA System Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-black rounded-lg mb-4 shadow-lg">
            <span className="text-3xl font-bold text-white tracking-widest">AIIA</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Agile Integrated Internal Audit
          </h2>
          <p className="text-gray-500 text-sm mt-1">Management System</p>
        </div>
        
        {/* Secure Connection Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 text-green-600">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">Secure Connection (HTTPS)</span>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto w-full">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-medium">
              AD Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your Bank AD username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: undefined });
                }}
                className={`pl-10 h-12 border-gray-300 focus:border-[#ffcb03] focus:ring-[#ffcb03] ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.username}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`pl-10 pr-10 h-12 border-gray-300 focus:border-[#ffcb03] focus:ring-[#ffcb03] ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember me
              </Label>
            </div>
            <a
              href="https://password.boc.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#0f1721] hover:text-[#ffcb03] transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#0f1721] hover:bg-[#1a2a3d] text-white font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </div>
            ) : (
              "Login to AIIA"
            )}
          </Button>
        </form>
        
        {/* Demo Credentials Notice */}
        <div className="mt-6 max-w-md mx-auto w-full">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Demo Access Available</p>
                <p className="text-xs text-amber-700 mt-1">
                  For demonstration purposes, use: <br />
                  <span className="font-mono bg-amber-100 px-1 rounded">Username: AU001</span> | 
                  <span className="font-mono bg-amber-100 px-1 rounded ml-1">Password: 2003</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Privacy Disclaimer */}
        <div className="mt-8 max-w-md mx-auto w-full">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Security Notice:</strong> Access to this system is restricted to authorized 
                Bank of Ceylon personnel only. All login attempts and system activities are logged 
                and monitored for security purposes. Unauthorized access is prohibited and may be 
                subject to legal action.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Powered by Bank of Ceylon IT Division</p>
          <p className="mt-1">Version 2.1.0 | Last Updated: December 2024</p>
        </div>
      </div>
    </div>
  );
};

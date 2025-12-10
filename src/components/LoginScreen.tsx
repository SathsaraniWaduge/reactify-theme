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
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (username === "AU001" && password === "2003") {
      toast.success("Demo login successful", {
        description: "Logged in with demonstration account AU001",
      });
      console.log("[AUDIT LOG] Demo account login:", { username, timestamp: new Date().toISOString() });
      onLogin();
    } else if (username && password) {
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-auto">
      {/* Left Panel - Bank of Ceylon Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 lg:min-h-screen relative flex-col justify-between p-8 xl:p-12"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 33, 0.95) 0%, rgba(36, 31, 33, 0.9) 100%)`,
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${bocBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* BOC Logo */}
        <div className="relative z-10">
          <img 
            src={bocLogo} 
            alt="Bank of Ceylon Logo" 
            className="h-14 xl:h-16 w-auto"
          />
        </div>
        
        {/* Welcome Content */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
              Welcome to the Secure
              <span className="block text-[#ffcb03]">Internal Audit Portal</span>
            </h1>
            <p className="text-base xl:text-lg text-white/80 max-w-md leading-relaxed">
              Access Bank of Ceylon's comprehensive audit management platform. 
              Streamline your audit workflows with enterprise-grade security.
            </p>
          </div>
          
          {/* Security Features Grid */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { icon: Shield, label: "Active Directory Integration" },
              { icon: Lock, label: "256-bit Encryption" },
              { icon: CheckCircle2, label: "SOC 2 Compliant" },
              { icon: User, label: "Role-Based Access" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <div className="p-1.5 rounded-lg bg-[#ffcb03]/20 flex-shrink-0">
                  <feature.icon className="h-4 w-4 text-[#ffcb03]" />
                </div>
                <span className="text-xs xl:text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white/50 text-xs xl:text-sm">
            © {new Date().getFullYear()} Bank of Ceylon. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col bg-white">
        <div className="flex-1 flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-12 xl:px-16 overflow-y-auto">
          {/* Mobile BOC Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <img 
              src={bocLogo} 
              alt="Bank of Ceylon Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* AIIA System Branding */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center px-5 py-2.5 bg-black rounded-lg mb-3 shadow-lg">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-widest">AIIA</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Agile Integrated Internal Audit
            </h2>
            <p className="text-gray-500 text-sm">Management System</p>
          </div>
          
          {/* Secure Connection */}
          <div className="flex items-center justify-center gap-2 mb-6 text-green-600">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Secure Connection (HTTPS)</span>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto w-full">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-gray-700 font-medium text-sm">
                AD Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your Bank AD username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: undefined });
                  }}
                  className={`pl-10 h-11 border-gray-300 focus:border-[#ffcb03] focus:ring-[#ffcb03] ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.username}
                </p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`pl-10 pr-10 h-11 border-gray-300 focus:border-[#ffcb03] focus:ring-[#ffcb03] ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
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
              className="w-full h-11 bg-[#0f1721] hover:bg-[#1a2a3d] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Login to AIIA"
              )}
            </Button>
          </form>
          
          {/* Demo Credentials */}
          <div className="mt-5 max-w-sm mx-auto w-full">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-amber-800">Demo Access</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    <span className="font-mono bg-amber-100 px-1 rounded">AU001</span> / 
                    <span className="font-mono bg-amber-100 px-1 rounded ml-1">2003</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Notice */}
          <div className="mt-4 max-w-sm mx-auto w-full">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Security:</strong> Access restricted to authorized Bank of Ceylon personnel. 
                  All activities are logged and monitored.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Bank of Ceylon IT Division | v2.1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

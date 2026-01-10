import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteUserAccountMutation } from "@/lib/api";
import toast from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SettingsTab() {
  const [deleteUserAccount, { isLoading }] = useDeleteUserAccountMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { signOut } = useClerk();

  const handleDelete = async () => {
    setIsDialogOpen(false);
    
    toast.promise(
      deleteUserAccount().unwrap(),
      {
        loading: "Deleting your account...",
        success: "✅ Account deleted successfully",
        error: "❌ Failed to delete account. Please try again.",
      }
    );

    // After deletion, sign out
    signOut();
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-2 border-red-300 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-200">
          <CardTitle className="text-red-600 text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Danger Zone
          </CardTitle>
          <CardDescription className="font-medium text-red-700">Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-xl border-2 border-red-300 bg-gradient-to-r from-red-50 to-orange-50 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-base font-bold mb-2 text-gray-900">Delete Account</p>
                <p className="text-sm text-gray-700 font-medium">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="default"
              onClick={() => setIsDialogOpen(true)}
              disabled={isLoading}
              className="gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              {isLoading ? "Deleting..." : "Delete My Account"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px] rounded-2xl border-2 border-gray-200">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <AlertDialogHeader>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300"
                >
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </motion.div>
                <AlertDialogTitle className="text-center text-2xl font-bold text-gray-900">
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-gray-700 font-medium">
                  Are you absolutely sure? This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:justify-center gap-2 mt-6">
                <AlertDialogCancel className="mt-0 border-2 font-semibold hover:bg-gray-50 transition-all">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Yes, Delete My Account
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </motion.div>
          </AnimatePresence>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
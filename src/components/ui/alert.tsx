import { useEffect } from "react";
import { useToast } from "../../hooks/use-toast";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectError } from "../../redux/appSlice";
const Alert = () => {
  const error = useAppSelector(selectError);
  const { toast } = useToast();
  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error,
      action: <></>,
    });
  }, [error]);
  return null;
};

export default Alert;

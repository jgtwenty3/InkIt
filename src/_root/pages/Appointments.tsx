
import Calendar from '@/components/shared/Calendar';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';



const Appointments = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  })

  return (
    <div className="p-5">
      <Calendar/>
      <Button onClick = {()=>login()}>Sync with Google Calendar</Button>
    </div>
  );
}

export default Appointments;

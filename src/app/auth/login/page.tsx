// "use client";
import { fetchUserData } from "@/app/ApiData/UserApiData";
import { useAuth } from "@/app/AuthProvider";
import UserForm from "@/Components/Auth/UserForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

const UserLogin = () => {
  // const { data: session } = useSession();
  // const {user}=useAuth();
  // const router = useRouter();
  // useEffect(()=>{
  //   if(user){
  //     router.push("dashboard/admin/")
  //   }
  // },[user,router])
  // if(user) return null;
  // useEffect(() => {
  //   if (session) {
  //     router.push("/dashboard/admin");
  //   }
  // }, [session, router]);
  // console.log(session);
  
  // if (session) return null;
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs={12} className="p-0">
          <div className="login-card login-dark">
            <UserForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLogin;
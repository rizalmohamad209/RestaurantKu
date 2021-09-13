import React from "react";
import { Card, LayoutOne, Text, Button } from "upkit";
import { Link } from "react-router-dom";

export default function SignupSukses() {
  return (
    <div>
      <LayoutOne size="small">
        <Card color="white">
          <Text as="h3">Pendaftaran Berhasil</Text>
          <Text>Silahkan masuk ke aplikasi</Text>
          <Link to="/">
            <Button fitContainer>Masuk</Button>
          </Link>
        </Card>
      </LayoutOne>
    </div>
  );
}

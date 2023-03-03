import { Button } from "@chakra-ui/button";
import { Center, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import styles from "./LocationPost.module.scss";
import HelpSystem from "./emergency";

const LocationPost = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  HelpSystem();

  const LocationPostNorm = () => {
    SetStatus();
    handleLocationPost("");
  };

  const LocationPostA = () => {
    SetStatus();
    handleLocationPost("A");
  };

  const LocationPostB = () => {
    SetStatus();
    handleLocationPost("B");
  };

  const [IPAdress, setIPAdress] = useState<string>("");
  const [UserName, setUserName] = useState<string>("");
  const [NasPass, setNasPass] = useState<string>("");
  const [FreeWifi, setFreeWifi] = useState<string>("");
  const [SSID, setSSID] = useState<string>("");
  const [WifiPass, setWifiPass] = useState<string>("");

  const SetStatus = () => {
    setIPAdress("IPアドレス: ftp://192.168.87:8000");
    setUserName("ユーザー名: PC");
    setNasPass("password: 1234");
    setFreeWifi("FREE Wi-fi");
    setSSID("SSID: 応仁のLAN");
    setWifiPass("password: 20040227");
  };

  const handleLocationPost = (Location: String) => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        if (Location === "A") {
          latitude = 123;
          longitude = 456;
        }

        if (Location === "B") {
          latitude = 999;
          longitude = 999;
        }

        axios
          .post("https://wifi.harutiro.net/location", {
            latitude: latitude,
            longitude: longitude,
          })
          .then((response) => {
            console.log(response.data);
            toast({
              title: "位置情報を送信しました。",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: "位置情報の送信に失敗しました。",
              description: "もう一度お試しください。",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      },
      (error) => {
        console.error(error);
        setLoading(false);
        toast({
          title: "位置情報の取得に失敗しました。",
          description: "もう一度お試しください。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        className={styles.container}
      >
        <Text fontSize="32px" fontWeight="bold" mb="2">
          FREE Wi-fi NASバージョン
        </Text>
        <Text fontSize="xl" fontWeight="semibold" mb="1">
          {IPAdress}
        </Text>
        <Text fontSize="xl" fontWeight="semibold" mb="1">
          {UserName}
        </Text>
        <Text fontSize="xl" fontWeight="semibold" mb="1">
          {NasPass}
        </Text>
        <Text fontSize="24px" fontWeight="bold" mb="2">
          {FreeWifi}
        </Text>
        <Text fontSize="xl" fontWeight="semibold" mb="1">
          {SSID}
        </Text>
        <Text fontSize="xl" fontWeight="semibold" mb="1">
          {WifiPass}
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={styles.container}
      >
        <Text fontSize="xl" fontWeight="semibold" mb="4">
          現在の位置情報を送信する
        </Text>
        <Button
          size="lg"
          onClick={LocationPostNorm}
          isLoading={loading}
          loadingText="送信中..."
          colorScheme="green"
          variant="solid"
          width="200px"
          className={styles.button}
        >
          位置情報を送信する
        </Button>
        {loading && (
          <Center mt="4">
            <Spinner size="md" color="green.500" />
          </Center>
        )}
        <div id="map" className={styles.map}></div>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={styles.container}
      >
        <Text fontSize="xl" fontWeight="semibold" mb="4">
          地点別の情報を送信する
        </Text>
        <Button
          size="lg"
          onClick={LocationPostA}
          isLoading={loading}
          loadingText="送信中..."
          colorScheme="green"
          variant="solid"
          width="200px"
          className={styles.button}
        >
          地点A
        </Button>
        {loading && (
          <Center mt="4">
            <Spinner size="md" color="green.500" />
          </Center>
        )}
        <Button
          size="lg"
          onClick={LocationPostB}
          isLoading={loading}
          loadingText="送信中..."
          colorScheme="green"
          variant="solid"
          width="200px"
          className={styles.button}
        >
          地点B
        </Button>
        {loading && (
          <Center mt="4">
            <Spinner size="md" color="green.500" />
          </Center>
        )}
      </Flex>
    </>
  );
};

export default LocationPost;

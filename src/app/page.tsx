import { QuickSpeak } from "@/components/shared/QuickSpeak";
import { HeroTitle } from "./components/HeroTitle";
import { Flex, Title, Text, Container, Stack, Blockquote, Button } from "@mantine/core";
import { LogoComponent } from "@/components/shared/LogoComponent";
import { IconInfoCircle } from "@tabler/icons-react";


export default function LandingPage() {

  const icon = <IconInfoCircle />;

  return (

    <>
      <Container size={800} p={'md'}>
        <Flex align={'center'} gap={'md'} justify={'space-between'} pt={30}>
          <Flex gap={'md'} align={'center'} >
            <LogoComponent size="XL" />
            <Title order={1} size={50}>INTERVALS</Title>
          </Flex>
          <QuickSpeak />
        </Flex>
      </Container>
      <HeroTitle />
      <Container size={800} p={'md'} mt="lg">
        <Stack gap={'lg'}>
          <Blockquote color="blue" icon={icon}>
            Мы сделали сервис дашбордов с функциями выгрузки данных, возможностями АИ-интеграции, удобной системой шеринга готовых дашбордов без паролей и прочих преград.
          </Blockquote>
          <Text >
            Функционал платформы <strong>бесплатен</strong>.
            Специальным клиентам предлагаем: разработку дашбордов,
            написание любых интеграций, AI-системы анализа данных,
            техническую поддержку на всех этапах.
          </Text>
          <Button
            gradient={{ from: 'blue', to: 'cyan' }} component='a' href="/oauth" fullWidth variant="gradient" size='xl'>
            Авторизоваться
          </Button>
        </Stack>
      </Container>

    </>


  );
}

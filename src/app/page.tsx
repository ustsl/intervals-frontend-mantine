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
        <Flex align={'center'} gap={'md'} justify={'space-between'}>
          <Flex gap={'md'} align={'center'}>
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
            Мы сделали простой и понятный AI-сервис дашбордов с функциями выгрузки данных с помощью открытого API, создания на базе данных графиков и вспомогательного контента и удобной системой шеринга готовых дашбордов без паролей и прочих сложностей.
          </Blockquote>
          <Text >
            Функционал платформы работает <strong>бесплатно и без ограничений</strong>.
            Специальным клиентам предлагаем:
            профессиональную разработку дашбордов,
            разработку прямых интеграций INTERVALS с источниками данных,
            CRM-системами, веб-приложениями, АИ-интеграции в системы отчетов
            и техническую поддержку на всех этапах.
          </Text>
          <Button gradient={{ from: 'blue', to: 'cyan' }} component='a' href="/oauth" fullWidth variant="gradient" size='xl'>Зарегистрироваться</Button>
        </Stack>
      </Container>
      <QuickSpeak />

    </>


  );
}

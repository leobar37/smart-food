import cmsLib from '@App/core/lib/cms';
import { useUpdateOrder } from '@App/core/modules/cart';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {
  DeliveryTypeEnum,
  OrderMetadata,
  PaymentMethods,
  PAYMENT_METHODS,
  SEDES,
} from '@smartfood/common';
import { BackButton } from '@smartfood/ui';
import { useFormik } from 'formik';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { confirmModalAtom } from '../atoms';
import { useResumeModalDisclousure } from '../useResumModal';
import { TEMPORAL_ORDER_KEY } from '../constants';
type FormDataType = {
  paymentMethod: string;
} & OrderMetadata['deliveryDetails'];

const FormCheckout = () => {
  const modalResume = useResumeModalDisclousure();
  const updateOrder = useUpdateOrder();
  const router = useRouter();
  const [, setConfirmModalState] = useAtom(confirmModalAtom);
  const formik = useFormik<FormDataType>({
    initialValues: {
      deliveryType: DeliveryTypeEnum.DELIVERY,
      direction: null,
      lastName: '',
      name: '',
      paymentMethod: PaymentMethods.YAPE,
      sede: null,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      updateOrder.mutateAsync(
        {
          paymentMethod: values.paymentMethod as any,
          metadata: {
            deliveryDetails: {
              deliveryType: values.deliveryType,
              direction: values.direction,
              lastName: values.lastName,
              name: values.name,
              phone: values.phone,
              reference: values.reference,
              sede: values.sede,
            },
          },
        },
        {
          onSuccess: (data) => {
            cmsLib.storage.clean();
            cmsLib.storage.setJson(TEMPORAL_ORDER_KEY, data);
            setConfirmModalState(true);
          },
        },
      );
      setSubmitting(false);
    },
  });

  const sedeOrDirection = useMemo(() => {
    if (
      (formik.values.deliveryType as DeliveryTypeEnum) === DeliveryTypeEnum.SEDE
    ) {
      return (
        <FormControl>
          <FormLabel>Elija la sede:</FormLabel>
          <Select
            name="sede"
            onChange={formik.handleChange}
            value={formik.values.sede ?? ''}
          >
            {SEDES.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.name}
              </option>
            ))}
          </Select>
        </FormControl>
      );
    } else {
      return (
        <>
          <FormControl>
            <FormLabel>Dirección:</FormLabel>
            <Input
              name="direction"
              onChange={formik.handleChange}
              value={formik.values.direction ?? ''}
              placeholder="Ejem: FIgueroa Hidalgo"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Referencia:</FormLabel>
            <Textarea
              name="reference"
              onChange={formik.handleChange}
              value={formik.values.reference}
              placeholder="Ejem: FIgueroa Hidalgo"
            />
          </FormControl>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  return (
    <VStack
      as="form"
      onSubmit={formik.handleSubmit as any}
      py="4"
      w="full"
      px="4"
    >
      <HStack my={4} ml="-6" w="full">
        <BackButton
          onClick={() => {
            router.replace('/carrito');
          }}
        />
        <Text
          w="full"
          textAlign={'start'}
          color="smartgreen.500"
          fontSize={'2xl'}
          fontWeight="semibold"
          my={3}
        >
          Formulario de Pedido
        </Text>
      </HStack>
      <FormControl>
        <FormLabel>Tipo de entrega</FormLabel>
        <RadioGroup
          name="deliveryType"
          onChange={(val) => {
            formik.setFieldValue('deliveryType', val);
          }}
          value={formik.values.deliveryType}
        >
          <Stack direction={['column', null, 'row']}>
            <Radio value={DeliveryTypeEnum.DELIVERY}>Delivery</Radio>
            <Radio value={DeliveryTypeEnum.SEDE}>Recoger en tienda</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl my="2">
        <FormLabel>Medio de pago:</FormLabel>
        <RadioGroup
          name="paymentMethod"
          onChange={(val) => {
            formik.setFieldValue('paymentMethod', val);
          }}
          value={formik.values.paymentMethod}
        >
          <Stack direction={['column', null, 'row']}>
            {PAYMENT_METHODS.map((py) => (
              <Radio value={py.value} key={py.value}>
                {py.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Nombre:</FormLabel>
        <Input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Ejem: Lucero"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Apellido:</FormLabel>
        <Input
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          placeholder="Ejem: FIgueroa Hidalgo"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Número de celular:</FormLabel>
        <Input
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          placeholder="Ejem: FIgueroa Hidalgo"
        />
      </FormControl>
      {sedeOrDirection}

      <Stack
        my={4}
        direction={['column', null, null, 'row']}
        alignItems={['center', null, 'flex-start']}
        w="full"
        justifyContent="flex-start"
      >
        <Link
          onClick={() => {
            modalResume.onOpen();
          }}
          color="smartgreen.500"
          display={['block', null, null, 'none']}
        >
          Ver Resumen
        </Link>
        <Button
          onClick={formik.submitForm}
          maxW={'max-content'}
          colorScheme={'smartgray'}
          size="lg"
        >
          Confirmar
        </Button>
      </Stack>
    </VStack>
  );
};

export default FormCheckout;

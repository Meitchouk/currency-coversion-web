import { Center, Loader } from '@mantine/core';

export function CustomLoader() {
  return (
    <Center style={{ minHeight: '80vh' }}>
      <Loader size={220} />
    </Center>
  );
}

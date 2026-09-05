import { StyleSheet, Text } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { palette, spacing } from '@/constants/theme';

export default function OperationsRoute() {
  return (
    <AppShell contentStyle={styles.body}>
      <Text style={styles.title}>Operaciones</Text>
      <Text style={styles.copy}>Usa Transferir dinero desde Inicio para completar el flujo de la prueba.</Text>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
    marginBottom: spacing.sm,
  },
  copy: {
    color: palette.textSecondary,
    fontSize: 16,
    lineHeight: 22,
  },
});

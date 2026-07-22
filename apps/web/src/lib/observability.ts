/**
 * Observability stubs — wire Sentry / OpenTelemetry when DSN/endpoint set.
 * No-ops in v1 so demos stay dependency-light.
 */

export function captureException(error: unknown, context?: Record<string, string>) {
  if (process.env.SENTRY_DSN) {
    // TODO: Sentry.captureException(error, { extra: context })
    console.error("[sentry-stub]", error, context);
    return;
  }
  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }
}

export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    // TODO: OTel span/event
    console.info("[otel-stub]", name, props);
  }
}

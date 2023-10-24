import Colors from "@dynatrace/strato-design-tokens/colors";

const METRIC_AUGMENTED_FLAG = true;

export function getMetricColor(value: number) {
    // For the see actual impact scores in the app I am going to
    // cheat and use a multilier.

    const effectiveValue = METRIC_AUGMENTED_FLAG ? value * 150 : value;

    const baseColor = Colors.Theme.Neutral;

    if (effectiveValue < 0.5) return baseColor["30"];
    if (effectiveValue < 0.7) return baseColor["60"];
    return baseColor["70"];
  }

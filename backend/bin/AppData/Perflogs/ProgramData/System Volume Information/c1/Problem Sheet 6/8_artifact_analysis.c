#include <stdio.h>

int main() {
    int n, i, j, temp;
    int a[50];

    printf("Enter number of artifacts: ");
    scanf("%d", &n);
    printf("Enter %d values: ", n);
    for (i = 0; i < n; i++) scanf("%d", &a[i]);

    // sort ascending
    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (a[i] > a[j]) { temp = a[i]; a[i] = a[j]; a[j] = temp; }

    printf("\nSorted Artifacts: { ");
    for (i = 0; i < n; i++) printf("%d ", a[i]);
    printf("}\n");

    // most common
    int most = a[0], count = 1, maxCount = 1, currentCount;
    for (i = 0; i < n; i++) {
        currentCount = 1;
        for (j = i + 1; j < n && a[j] == a[i]; j++) currentCount++;
        if (currentCount > maxCount || (currentCount == maxCount && a[i] < most)) {
            most = a[i];
            maxCount = currentCount;
        }
        i = j - 1;
    }
    printf("Most Common Artifact: %d (appears %d times)\n", most, maxCount);

    // missing values
    printf("Missing Values: ");
    int missingFound = 0;
    for (i = a[0]; i <= a[n - 1]; i++) {
        int present = 0;
        for (j = 0; j < n; j++)
            if (a[j] == i) { present = 1; break; }
        if (!present) { printf("%d ", i); missingFound = 1; }
    }
    if (!missingFound) printf("None");
    printf("\n");

    // sum of unique
    int sum = a[0];
    for (i = 1; i < n; i++)
        if (a[i] != a[i - 1]) sum += a[i];
    printf("Sum of Unique Artifacts: %d\n", sum);
    return 0;
}

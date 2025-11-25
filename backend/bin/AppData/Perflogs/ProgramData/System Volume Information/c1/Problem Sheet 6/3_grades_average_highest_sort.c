#include <stdio.h>

int main() {
    int n, i, j, temp, max;
    float sum = 0, avg;
    int grades[50];

    printf("Enter number of grades: ");
    scanf("%d", &n);
    printf("Enter %d grades: ", n);
    for (i = 0; i < n; i++) scanf("%d", &grades[i]);

    // average
    for (i = 0; i < n; i++) sum += grades[i];
    avg = sum / n;

    // highest
    max = grades[0];
    for (i = 1; i < n; i++)
        if (grades[i] > max) max = grades[i];

    // sort ascending
    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (grades[i] > grades[j]) {
                temp = grades[i];
                grades[i] = grades[j];
                grades[j] = temp;
            }

    printf("\nAverage Grade: %.2f\nHighest Grade: %d\nSorted Grades: [ ", avg, max);
    for (i = 0; i < n; i++) printf("%d ", grades[i]);
    printf("]\n");
    return 0;
}

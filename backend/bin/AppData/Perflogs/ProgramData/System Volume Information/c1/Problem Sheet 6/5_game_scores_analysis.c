#include <stdio.h>

int main() {
    int n, i, j, temp, max, threshold, count = 0;
    int score[50];

    printf("Enter number of players: ");
    scanf("%d", &n);
    printf("Enter %d scores: ", n);
    for (i = 0; i < n; i++) scanf("%d", &score[i]);

    printf("Enter threshold score: ");
    scanf("%d", &threshold);

    // top scorer
    max = score[0];
    for (i = 1; i < n; i++)
        if (score[i] > max) max = score[i];

    // count above threshold
    for (i = 0; i < n; i++)
        if (score[i] > threshold) count++;

    // sort ascending
    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (score[i] > score[j]) {
                temp = score[i];
                score[i] = score[j];
                score[j] = temp;
            }

    printf("\nTop Scorer’s Score: %d\nPlayers Above %d: %d\nSorted Scores: ", max, threshold, count);
    for (i = 0; i < n; i++) printf("%d ", score[i]);
    printf("\n");
    return 0;
}

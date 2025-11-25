#include <stdio.h>

int main() {
    int n, i;
    int price[50];

    printf("Enter number of price points: ");
    scanf("%d", &n);
    printf("Enter %d stock prices: ", n);
    for (i = 0; i < n; i++) scanf("%d", &price[i]);

    int minPrice = price[0], maxProfit = 0, profit;
    for (i = 1; i < n; i++) {
        if (price[i] < minPrice)
            minPrice = price[i];
        profit = price[i] - minPrice;
        if (profit > maxProfit)
            maxProfit = profit;
    }

    printf("Maximum Profit: %d\n", maxProfit);
    return 0;
}

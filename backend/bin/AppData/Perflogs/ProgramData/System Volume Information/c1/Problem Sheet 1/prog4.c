#include <stdio.h>
int main() {
    int DD, MM, CC, YY, century_term, year_term, month_term, total, remainder;
    printf("Enter date (DD MM CC YY): ");
    scanf("%d %d %d %d", &DD, &MM, &CC, &YY);

    century_term = (CC/4) - (2*CC) - 1;
    year_term = (5*YY)/4;
    total = century_term + year_term;

    month_term = (26*(MM+1))/10;
    total = total + month_term + DD;

    remainder = total % 7;

    char *days[] = {"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
    printf("Day: %s\n", days[remainder]);

    return 0;
}

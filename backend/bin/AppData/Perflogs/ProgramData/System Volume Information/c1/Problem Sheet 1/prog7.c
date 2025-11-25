#include <stdio.h>
int main() {
    int total = 21, player, computer;
    while(total > 1) {
        printf("Pick 1-4 matchsticks: ");
        scanf("%d",&player);
        if(player < 1 || player > 4){
            printf("Invalid! Pick 1-4 only.\n");
            continue;
        }
        total -= player;

        computer = 5 - player;
        printf("Computer picks %d\n", computer);
        total -= computer;

        printf("Remaining: %d\n", total);
    }
    printf("You lose! Computer wins.\n");
    return 0;
}

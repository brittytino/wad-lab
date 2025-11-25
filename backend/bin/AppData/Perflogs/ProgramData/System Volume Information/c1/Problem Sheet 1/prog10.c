#include <stdio.h>
int main() {
    float x, i;
    int y;
    for(y=1;y<=6;y++){
        for(x=5.5;x<=12.5;x+=0.5){
            i = 2 + (y + 0.5*x);
            printf("y=%d x=%.1f i=%.2f\n", y, x, i);
        }
        printf("\n");
    }
    return 0;
}

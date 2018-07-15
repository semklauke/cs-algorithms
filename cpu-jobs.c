#include <stdio.h>
#define MAX_QUANTUM 13

//shifts all elements of array to the left
//The first element goes to the end
void shiftArray(int* array, int n) {
	int k, temp = array[0];
	for(k=0;k<n-1;k++) {
		array[k]=array[k+1];
	}
	array[n-1]=temp;
}


void printJobs(int Q, int n, int jobs[]) {
	int jobsCopy[n], finTime[n], waitTime[n], i;
	for (i = 0; i < n; i++) {
		waitTime[i] = 0; //stores the waiting Time for every Job
		finTime[i] = 0; //stores finishing Time for every Job
		jobsCopy[i] = jobs[i]; // copy all jobs
	}

	i = 1; //counts process units
	int currentJob = 0; //current job thats getting processt
	int c = 1; //counts process units sice job start
	int zero = 0; //count done jobs

	while (1) {
		if (jobsCopy[0] != 0) {
			// job is not done yet

			zero = 0;
			jobsCopy[0] = jobsCopy[0] - 1; //-1 process unit
			if (jobsCopy[0] == 0) {
				//job is done now - add current process unit to finish Time
				finTime[currentJob] = i;
				c -= (c % Q); //Reset counter so the next job gets processed
			}

			//add to all jobs execpt the current and finished jobs 1 wainting process unit
			int j;
			for (j = 0; j < n; j++) {
				if (j != currentJob && finTime[j] == 0)
					waitTime[j] = waitTime[j] + 1;
			}
			
			//Go to the next job if the Quantum is over or the job is done
			if (c % Q == 0) {
				currentJob = (currentJob + 1) % (n);
				shiftArray(jobsCopy, n);
			}
			//increast counters
			c++; 
			i++;

		} else {
			//job is done

			zero++;
			//go to next job
			currentJob = (currentJob + 1) % (n);
			shiftArray(jobsCopy, n);
			if (zero == n)
				break; //if all jobs are done, finish the while loop
		}
		
		
	}

	//get the avarage waiting time
	float avgTime = 0.0;
	for (i = 0; i < n; i++)
		avgTime += waitTime[i];
	avgTime = avgTime/n;

	//Print out the Quantum, all jobs and the avarage waiting time
	printf("%02d\t", Q);
	for (i = 0; i < n; i++) {
		printf("%02d\t", finTime[i]);
	}
	printf("%.2f", avgTime);
	
}

int main(int argc, char *argv[]) {
	//the jobs to process
	int jobs[] = {6, 13, 7, 3, 4, 9, 10, 11};
	//n = amout of jobs
	int q, n = 8;
	//print headline
	printf("Q\t");
	for (q = 1; q <= n; q++)
		printf("P%d\t", q);	
	printf("Avg.Time \n");
	//print underline
	for (q = 1; q <= (n+2); q++)
		printf("--------");
	printf("\n");

	//print all jobs
	for (q = 1; q <= MAX_QUANTUM; q++) {
		printJobs(q, n, jobs);
		printf("\n");
	}
}

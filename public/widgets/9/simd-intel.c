#include <xmmintrin.h>
#include <string.h>
#include <malloc.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>


long long wall_clock_time()
{
#ifdef __linux__
	struct timespec tp;
	clock_gettime(CLOCK_REALTIME, &tp);
	return (long long)(tp.tv_nsec + (long long)tp.tv_sec * 1000000000ll);
#else
#warning "Your timer resolution may be too low. Compile on linux"
	struct timeval tv;
	gettimeofday(&tv, NULL);
	return (long long)(tv.tv_usec * 1000 + (long long)tv.tv_sec * 1000000000ll);
#endif
}


float norm_simd(float *a, float* b, int size)
{
	int i;
	__m128 vprod = _mm_setzero_ps();
	__m128 va, vb, vc;
	float prod[4];
	for (i = 0; i < size; i += 4) 
	{
		va = _mm_load_ps(&a[i]); 
		vb = _mm_load_ps(&b[i]);
		vc = _mm_mul_ps(va, vb);
		vprod = _mm_add_ps(vprod, vc);
   	}
	_mm_store_ps(prod, vprod);
	return prod[0] + prod[1] + prod[2] + prod[3];
}

float norm(float *a, float * b, int size)
{
	int i;
	float prod = 0;
	float sa, sb, sc;
	for (i = 0; i < size; i++)
	{
		sa = a[i];
		sb = b[i];
		sc = sa * sb;
		prod = prod + sc;
	}	
	return prod;
}


void init(float** x, int size)
{
	int i;
	*x = (float*)memalign(16, size * sizeof(float));
	for (i = 0; i < size; i++)
		(*x)[i] = (float)( rand() % 10);
}

void work(int size)
{
	float *a, *b;
	float prod1 = 0.0, prod2 = 0.0;
	long long before, after;
	int i;

	init(&a, size);
	init(&b, size);

	before = wall_clock_time();
	i = 1000000;	
	while ( i-- > 0) 
		prod1 += norm(a, b, size);
	after = wall_clock_time();
	fprintf(stderr, "Scalar vector normalization took %1.2f seconds\n", ((float)(after - before))/1000000000);

	before = wall_clock_time();
	i = 1000000;	
	while ( i-- > 0) 
		prod2 += norm_simd(a, b, size);
	after = wall_clock_time();
	fprintf(stderr, "SIMD vector normalization took %1.2f seconds\n", ((float)(after - before))/1000000000);
	
	if (prod1 == prod2)
		printf("Ok\n");
	else
		printf("Not ok\n");
}

int main(int argc, char ** argv)
{
	int size;
	srand(0);

	if (argc >= 2)
		size = atoi(argv[1]);
	else
		size = 1024;

	work(size);

	return 0;
}

#define _CRT_SECURE_NO_WARNINGS
#define _USE_MATH_DEFINES
#include<math.h>
#include<stdio.h>
#include<string.h>
#include<time.h>
#include<stdlib.h>

extern "C" {
#include"../szablon2/SDL2-2.0.10/include/SDL.h"
#include"../szablon2/SDL2-2.0.10/include/SDL_main.h"
}

#define SCREEN_WIDTH	640
#define SCREEN_HEIGHT	480

#define CAR_LANES 5
#define TURTLE_LANES 3
#define WOOD_LANES 2

#define CAR_PER_LANE 8
#define TURTLE_PER_LANE 12
#define WOOD_PER_LANE 5

struct surface {
	double X;
	int Y;
	SDL_Surface* image;
	int speed;
};

// narysowanie napisu txt na powierzchni screen, zaczynaj¹c od punktu (x, y)
// charset to bitmapa 128x128 zawieraj¹ca znaki
// draw a text txt on surface screen, starting from the point (x, y)
// charset is a 128x128 bitmap containing character images
void DrawString(SDL_Surface* screen, int x, int y, const char* text,
	SDL_Surface* charset) {
	int px, py, c;
	SDL_Rect s, d;
	s.w = 8;
	s.h = 8;
	d.w = 8;
	d.h = 8;
	while (*text) {
		c = *text & 255;
		px = (c % 16) * 8;
		py = (c / 16) * 8;
		s.x = px;
		s.y = py;
		d.x = x;
		d.y = y;
		SDL_BlitSurface(charset, &s, screen, &d);
		x += 8;
		text++;
	};
};


// narysowanie na ekranie screen powierzchni sprite w punkcie (x, y)
// (x, y) to punkt œrodka obrazka sprite na ekranie
// draw a surface sprite on a surface screen in point (x, y)
// (x, y) is the center of sprite on screen
void DrawSurface(SDL_Surface* screen, SDL_Surface* sprite, int x, int y) {
	SDL_Rect dest;
	dest.x = x - sprite->w / 2;
	dest.y = y - sprite->h / 2;
	dest.w = sprite->w;
	dest.h = sprite->h;
	SDL_BlitSurface(sprite, NULL, screen, &dest);
};


// rysowanie pojedynczego pixela
// draw a single pixel
void DrawPixel(SDL_Surface* surface, int x, int y, Uint32 color) {
	int bpp = surface->format->BytesPerPixel;
	Uint8* p = (Uint8*)surface->pixels + y * surface->pitch + x * bpp;
	*(Uint32*)p = color;
};


// rysowanie linii o d³ugoœci l w pionie (gdy dx = 0, dy = 1) 
// b¹dŸ poziomie (gdy dx = 1, dy = 0)
// draw a vertical (when dx = 0, dy = 1) or horizontal (when dx = 1, dy = 0) line
void DrawLine(SDL_Surface* screen, int x, int y, int l, int dx, int dy, Uint32 color) {
	for (int i = 0; i < l; i++) {
		DrawPixel(screen, x, y, color);
		x += dx;
		y += dy;
	};
};


// rysowanie prostok¹ta o d³ugoœci boków l i k
// draw a rectangle of size l by k
void DrawRectangle(SDL_Surface* screen, int x, int y, int l, int k,
	Uint32 outlineColor, Uint32 fillColor) {
	int i;
	DrawLine(screen, x, y, k, 0, 1, outlineColor);
	DrawLine(screen, x + l - 1, y, k, 0, 1, outlineColor);
	DrawLine(screen, x, y, l, 1, 0, outlineColor);
	DrawLine(screen, x, y + k - 1, l, 1, 0, outlineColor);
	for (i = y + 1; i < y + k - 1; i++)
		DrawLine(screen, x + 1, i, l - 2, 1, 0, fillColor);
};

void Buffor(surface cars[CAR_LANES][CAR_PER_LANE],														//inicjacja tekstór, pozycji, prêdkoœci itp.
	surface turtles[TURTLE_LANES][TURTLE_PER_LANE],
	surface woods[WOOD_LANES][WOOD_PER_LANE],
	surface frogs[1][5],
	surface pos[1][5]) {
	
	double line = SCREEN_HEIGHT / 13;

	srand(time(NULL));

	for (int i = 0; i < CAR_PER_LANE; i++) {
		cars[0][i].image = SDL_LoadBMP("../szablon2/Medias/car1.bmp");
		cars[1][i].image = SDL_LoadBMP("../szablon2/Medias/car2.bmp");
		cars[2][i].image = SDL_LoadBMP("../szablon2/Medias/car3.bmp");
		cars[3][i].image = SDL_LoadBMP("../szablon2/Medias/car4.bmp");
		cars[4][i].image = SDL_LoadBMP("../szablon2/Medias/car1.bmp");
	}

	for (int i = 0; i < TURTLE_LANES; i++) {
		for (int j = 0; j < TURTLE_PER_LANE; j++)
		{
			turtles[i][j].image = SDL_LoadBMP("../szablon2/Medias/turtle.bmp");
		}
	}

	for (int i = 0; i < WOOD_PER_LANE; i++) {
		woods[0][i].image = SDL_LoadBMP("../szablon2/Medias/log.bmp");
		woods[1][i].image = SDL_LoadBMP("../szablon2/Medias/log.bmp");

	}

	for (int i = 0; i < 5; i++) {
		frogs[0][i].image = SDL_LoadBMP("../szablon2/Medias/mark.bmp");
	}


	for (int i = 0; i < CAR_LANES; i++) {
		int X = rand() % 50;
		for (int j = 0; j < CAR_PER_LANE; j++)
		{
			int x = rand() % 40 + 1100 / CAR_PER_LANE;
			X += x;
			cars[i][j].X = X;
		}
	}

	for (int i = 0; i < TURTLE_LANES; i++) {
		int X = rand() % 50;
		for (int j = 0; j < TURTLE_PER_LANE; j++)
		{
			if (j % 3) {

				X += 35;
				turtles[i][j].X = X;
			}
			else {
				int x = rand() % 40 + (800 / TURTLE_PER_LANE) * 3;
				X += x;
				turtles[i][j].X = X;

			}
		}
	}

	for (int i = 0; i < WOOD_LANES; i++) {
		int X = rand() % 45 + 50;
		for (int j = 0; j < WOOD_PER_LANE; j++)
		{
			int x = rand() % 65 + 940 / WOOD_PER_LANE;
			X += x;
			woods[i][j].X = X;
		}
	}

	frogs[0][0].X = 3000;

	for (int i = 1; i < 5; i++) {
		frogs[0][i].X = frogs[0][i - 1].X + 138;
	}

	pos[0][0].X = 45;
	for (int i = 1; i < 5; i++) {
		pos[0][i].X = pos[0][i - 1].X + 138;
	}

	for (int i = 0; i < CAR_PER_LANE; i++) {
		cars[0][i].Y = line * 12;
		cars[1][i].Y = line * 11;
		cars[2][i].Y = line * 10;
		cars[3][i].Y = line * 9;
		cars[4][i].Y = line * 8;
	}

	for (int i = 0; i < TURTLE_PER_LANE; i++) {
		turtles[0][i].Y = line * 6;
		turtles[1][i].Y = line * 5;
		turtles[2][i].Y = line * 3;
	}

	for (int i = 0; i < WOOD_PER_LANE; i++) {
		woods[0][i].Y = line * 4;
		woods[1][i].Y = line * 2;

	}

	for (int i = 0; i < 5; i++) {
		frogs[0][i].Y = line;
	}

	for (int i = 0; i < CAR_LANES; i++) {
		int speed = rand() % 25 + 90;
		for (int j = 0; j < CAR_PER_LANE; j++)
		{
			cars[i][j].speed = speed;
		}
	}

	for (int i = 0; i < TURTLE_LANES; i++) {
		int speed = rand() % 25 + 90;
		for (int j = 0; j < TURTLE_PER_LANE; j++)
		{
			turtles[i][j].speed = speed;
		}
	}

	for (int i = 0; i < WOOD_LANES; i++) {
		int speed = rand() % 25 + 90;
		for (int j = 0; j < WOOD_PER_LANE; j++)
		{
			woods[i][j].speed = speed;
		}
	}
}

void stop(bool pause , int &t2, int &t1, double &p_t1) {														//zatrzymanie czau gry
	if (pause == true) {
		t2 = SDL_GetTicks();
		p_t1 = t2 * 0.001 - t1 * 0.001;
	}
};

void death(double &frog_X, int &frog_Y, int line, double &worldTime, int &lives, int &points, int &max) {				//œmieræ
	if (frog_Y == max) {
		points -= 10;
		max += line;
	}
	frog_X = frog_X = SCREEN_WIDTH / 2, frog_Y = line * 13;
	worldTime = 0;
	lives--;
	
}

// main
#ifdef __cplusplus
extern "C"
#endif
int main(int argc, char** argv) {
	FILE* best = fopen("highscore.txt", "r");
	FILE* copy = fopen("copy.txt", "w+");

	double delta, worldTime, fpsTimer, fps, distance, Speed, line = SCREEN_HEIGHT / 13, p_t1 = 0, p_t2 = 0;
	char* name[15] = { "Some Text" };
	int t1, t2, quit, frames, rc, crowns = 0, points = 0, max = line * 13;
	int *highscore = (int*)calloc(10, sizeof(int));
		for (int i = 0; i < 10; i++) {
			fscanf(best, "%i \n", &highscore[i]);
			fprintf(copy, "%i \n", highscore[i]);
			printf("%i \n", highscore[i]);
		}
	fclose(best);
	best = fopen("highscore.txt", "w+");

	SDL_Event event;
	SDL_Surface* screen, * charset;
	SDL_Surface* eti;
	SDL_Surface* background;
	SDL_Surface* frogger;
	SDL_Texture* scrtex;
	SDL_Window* window;
	SDL_Renderer* renderer;

	surface cars[CAR_LANES][CAR_PER_LANE];
	surface turtles[TURTLE_LANES][TURTLE_PER_LANE];
	surface woods[WOOD_LANES][WOOD_PER_LANE];
	surface frogs[1][5];
	surface pos[1][5];


	int lives = 3;
	bool swim = true, pause = false, menu = true, scores = false;

	Buffor(cars,
		turtles,
		woods,
		frogs,
		pos);
	
	// okno konsoli nie jest widoczne, je¿eli chcemy zobaczyæ
	// komunikaty wypisywane printf-em trzeba w opcjach:
	// project -> szablon2 properties -> Linker -> System -> Subsystem
	// zmieniæ na "Console"
	// console window is not visible, to see the printf output
	// the option:
	// project -> szablon2 properties -> Linker -> System -> Subsystem
	// must be changed to "Console"
	printf("wyjscie printfa trafia do tego okienka\n");
	printf("printf output goes here\n");

	if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
		printf("SDL_Init error: %s\n", SDL_GetError());
		return 1;
	}

	// tryb pe³noekranowy / fullscreen mode
//	rc = SDL_CreateWindowAndRenderer(0, 0, SDL_WINDOW_FULLSCREEN_DESKTOP,
//	                                 &window, &renderer);
	rc = SDL_CreateWindowAndRenderer(SCREEN_WIDTH, SCREEN_HEIGHT, 0,
		&window, &renderer);
	if (rc != 0) {
		SDL_Quit();
		printf("SDL_CreateWindowAndRenderer error: %s\n", SDL_GetError());
		return 1;
	};

	SDL_SetHint(SDL_HINT_RENDER_SCALE_QUALITY, "linear");
	SDL_RenderSetLogicalSize(renderer, SCREEN_WIDTH, SCREEN_HEIGHT);
	SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);

	SDL_SetWindowTitle(window, "Frogger");


	screen = SDL_CreateRGBSurface(0, SCREEN_WIDTH, SCREEN_HEIGHT, 32,
		0x00FF0000, 0x0000FF00, 0x000000FF, 0xFF000000);

	scrtex = SDL_CreateTexture(renderer, SDL_PIXELFORMAT_ARGB8888,
		SDL_TEXTUREACCESS_STREAMING,
		SCREEN_WIDTH, SCREEN_HEIGHT);


	// wy³¹czenie widocznoœci kursora myszy
	SDL_ShowCursor(SDL_ENABLE);

	// wczytanie obrazka cs8x8.bmp
	charset = SDL_LoadBMP("../szablon2/cs8x8.bmp");
	if (charset == NULL) {
		printf("SDL_LoadBMP(cs8x8.bmp) error: %s\n", SDL_GetError());
		SDL_FreeSurface(screen);
		SDL_DestroyTexture(scrtex);
		SDL_DestroyWindow(window);
		SDL_DestroyRenderer(renderer);
		SDL_Quit();
		return 1;
	};
	SDL_SetColorKey(charset, true, 0x000000);

	eti = SDL_LoadBMP("../szablon2/eti.bmp");
	if (eti == NULL) {
		printf("SDL_LoadBMP(eti.bmp) error: %s\n", SDL_GetError());
		SDL_FreeSurface(charset);
		SDL_FreeSurface(screen);
		SDL_DestroyTexture(scrtex);
		SDL_DestroyWindow(window);
		SDL_DestroyRenderer(renderer);
		SDL_Quit();
		return 1;
	};

	frogger = SDL_LoadBMP("../szablon2/Medias/frogger.bmp");

	background = SDL_LoadBMP("../szablon2/Medias/background.bmp");

	if (background == NULL) {
		printf("SDL_LoadBMP(background.bmp) error: %s\n", SDL_GetError());
		SDL_FreeSurface(frogger);
		SDL_FreeSurface(eti);
		SDL_FreeSurface(charset);
		SDL_FreeSurface(screen);
		SDL_DestroyTexture(scrtex);
		SDL_DestroyWindow(window);
		SDL_DestroyRenderer(renderer);
		SDL_Quit();
		return 1;
	}

	for (int i = 0; i < CAR_LANES; i++){
		for (int j = 0; j < CAR_PER_LANE; j++) {
			if (cars[i][j].image == NULL) {
				for (int k = 0; k <= i; k++) {
					for (int z = 0; z <= j; z++) {
						SDL_FreeSurface(cars[k][z].image);
					}
				}
				SDL_FreeSurface(frogger);
				SDL_FreeSurface(background);
				SDL_FreeSurface(eti);
				SDL_FreeSurface(charset);
				SDL_FreeSurface(screen);
				SDL_DestroyTexture(scrtex);
				SDL_DestroyWindow(window);
				SDL_DestroyRenderer(renderer);
				SDL_Quit();
				return 1;
			}
			
		}
	}
	
	for (int i = 0; i < TURTLE_LANES; i++) {
		for (int j = 0; j < TURTLE_PER_LANE; j++) {
			if (turtles[i][j].image == NULL) {
				for (int k = 0; k <= i; k++) {
					for (int z = 0; z <= j; z++) {
						SDL_FreeSurface(turtles[k][z].image);
					}
				}
				SDL_FreeSurface(frogger);
				SDL_FreeSurface(background);
				SDL_FreeSurface(eti);
				SDL_FreeSurface(charset);
				SDL_FreeSurface(screen);
				SDL_DestroyTexture(scrtex);
				SDL_DestroyWindow(window);
				SDL_DestroyRenderer(renderer);
				SDL_Quit();
				return 1;
			}
		}
	}

	for (int i = 0; i < WOOD_LANES; i++) {
		for (int j = 0; j < WOOD_PER_LANE; j++) {
			if (woods[i][j].image == NULL) {
				for (int k = 0; k <= i; k++) {
					for (int z = 0; z <= j; z++) {
						SDL_FreeSurface(woods[k][z].image);
					}
				}
				SDL_FreeSurface(frogger);
				SDL_FreeSurface(background);
				SDL_FreeSurface(eti);
				SDL_FreeSurface(charset);
				SDL_FreeSurface(screen);
				SDL_DestroyTexture(scrtex);
				SDL_DestroyWindow(window);
				SDL_DestroyRenderer(renderer);
				SDL_Quit();
				return 1;
			}
		}
	}

	char text[128];
	int czarny = SDL_MapRGB(screen->format, 0x00, 0x00, 0x00);
	int zielony = SDL_MapRGB(screen->format, 0x00, 0xFF, 0x00);
	int czerwony = SDL_MapRGB(screen->format, 0xFF, 0x00, 0x00);
	int niebieski = SDL_MapRGB(screen->format, 0x11, 0x11, 0xCC);

	t1 = SDL_GetTicks();

	frames = 0;
	fpsTimer = 0;
	fps = 0;
	quit = 0;
	worldTime = 0;
	distance = 0;
	Speed = 100;

	double frog_X = SCREEN_WIDTH / 2;
	int frog_Y = line * 13;

	while (!quit) {
		while (menu == true) {											//obs³uga menu
			pause = true;
			stop(pause, t2, t1, p_t1);
			DrawSurface(screen, background, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
			sprintf(text, "START GAME - G");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 - 150, text, charset);
			sprintf(text, "HIGH SCORES - H");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 - 50, text, charset);
			SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
			SDL_RenderCopy(renderer, scrtex, NULL, NULL);
			SDL_RenderPresent(renderer);
			while (SDL_PollEvent(&event)) {
				switch (event.type) {
				case SDL_KEYDOWN:
					if (event.key.keysym.sym == SDLK_h) {
						scores = true;
						menu = false;
					}
					if (event.key.keysym.sym == SDLK_g) {
						menu = false;
						pause = false;
						lives = 3, crowns = 0, points = 0, max = line * 13;
						Buffor(cars,
							turtles,
							woods,
							frogs,
							pos);
						worldTime = 0;
					}
					if (event.key.keysym.sym == SDLK_ESCAPE) {
						menu = false;
						fclose(best);
						fclose(copy);
						quit = 1;
					}
					break;
				case SDL_QUIT:
					quit = 1;
					break;
				}
			}
		}

		while (scores == true) {											//obs³uga tablicy wyników
			menu = false;
			pause = true;
			DrawSurface(screen, background, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
			stop(pause, t2, t1, p_t1);
			for (int i = 0; i < 10; i++) {
				sprintf(text, "%i \n", highscore[i]);
				DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 - 150 + 10*i, text, charset);
			}
			sprintf(text, "MENU - H");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 - 30, text, charset);
			SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
			SDL_RenderCopy(renderer, scrtex, NULL, NULL);
			SDL_RenderPresent(renderer);
			while (SDL_PollEvent(&event)) {
				switch (event.type) {
				case SDL_KEYDOWN:
					if (event.key.keysym.sym == SDLK_h) {
						scores = false;
						menu = true;
					}
					if (event.key.keysym.sym == SDLK_ESCAPE) {
						scores = false;
						fclose(best);
						fclose(copy);
						quit = 1;
					}
					break;
				case SDL_QUIT:
					quit = 1;
					break;
				}
			}
		}

		if (lives <= 0 && menu == false) {													//koniec ¿yæ / Game Over
			if (frog_Y < max) {
				points -= 10;
			}
			pause = true;
			stop(pause, t2, t1, p_t1);
			DrawRectangle(screen, SCREEN_WIDTH, SCREEN_HEIGHT / 2, SCREEN_WIDTH - 8, 36, czerwony, niebieski);
			sprintf(text, "GAME OVER");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 6, text, charset);
			sprintf(text, "Zakonczyc gre?");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 16, text, charset);
			sprintf(text, "Y/N");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 26, text, charset);
			SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
			SDL_RenderCopy(renderer, scrtex, NULL, NULL);
			SDL_RenderPresent(renderer);
			while (SDL_PollEvent(&event)) {
				switch (event.type) {
				case SDL_KEYDOWN:
					if (event.key.keysym.sym == SDLK_y) {
						for (int i = 0; i < 10; i++) {
							if (points >= highscore[i]) {
								for (int j = 9; j > i; j--) {
									highscore[j] = highscore[j - 1];
								}
								highscore[i] = points;
								break;
							}
						}
						for (int i = 0; i < 10; i++) {
								printf("%i \n", highscore[i]);
							if (copy == NULL)
								printf("Blad otwarcia pliku\n");
							else
								fprintf(copy, "%i \n", highscore[i]);
						}
						for (int i = 0; i < 10; i++) {
							fscanf(copy, "%i \n", &highscore[i]);
							fprintf(best, "%i \n", highscore[i]);
							printf("%i \n", highscore[i]);
						}
						menu = true;
					}
					if (event.key.keysym.sym == SDLK_n) {
						menu = false;
						pause = false;
						lives = 3, crowns = 0, points = 0, max = line * 13;
						Buffor(cars,
							turtles,
							woods,
							frogs,
							pos);
						worldTime = 0;
					}
					if (event.key.keysym.sym == SDLK_ESCAPE) {
						fclose(best);
						fclose(copy);
						quit = 1;
					}
						break;
				case SDL_QUIT:
					quit = 1;
					break;
					};
				};
			}

		else if (crowns == 5) {																	//wygrana
			pause = true;
			stop(pause, t2, t1, p_t1);
			for (int i = 0; i < 10; i++) {
				if (points >= highscore[i]) {
					for (int j = 9; j > i; j--) {
						highscore[j] = highscore[j - 1];
					}
					highscore[i] = points;
					break;
				}
			}
			for (int i = 0; i < 10; i++) {
				printf("%i \n", highscore[i]);
				if (copy == NULL)
					printf("Blad otwarcia pliku\n");
				else
					fprintf(copy, "%i \n", highscore[i]);
			}
			for (int i = 0; i < 10; i++) {
				fscanf(copy, "%i \n", &highscore[i]);
				fprintf(best, "%i \n", highscore[i]);
				printf("%i \n", highscore[i]);
			}
			DrawRectangle(screen, SCREEN_WIDTH, SCREEN_HEIGHT / 2, SCREEN_WIDTH - 8, 36, czerwony, niebieski);
			sprintf(text, "Gratulacje! Wygra³eœ!");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 6, text, charset);
			sprintf(text, "Kontynowaæ?");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 16, text, charset);
			sprintf(text, "Y/N");
			DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 26, text, charset);
			SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
			SDL_RenderCopy(renderer, scrtex, NULL, NULL);
			SDL_RenderPresent(renderer);
			while (SDL_PollEvent(&event)) {
				switch (event.type) {
				case SDL_KEYDOWN:
					if (event.key.keysym.sym == SDLK_y) {
						menu = false;
						pause = false;
						lives = 3, crowns = 0, points = 0, max = line * 13;
						Buffor(cars,
							turtles,
							woods,
							frogs,
							pos);
						worldTime = 0;
						break;
					}
					if (event.key.keysym.sym == SDLK_n) {
						menu = true;
					}
					if (event.key.keysym.sym == SDLK_ESCAPE) {
						fclose(best);
						fclose(copy);
						quit = 1;
					}
				case SDL_QUIT:
					quit = 1;
					break;
					};
				};
			}

		else if (worldTime > 50) {																		//koniec czasu
			death(frog_X, frog_Y, line, worldTime, lives, points, max);
		}

		else {																							
			if (pause == true) {
				stop(pause, t2, t1, p_t1);
			}
			else {
				t2 = SDL_GetTicks();
				delta = (t2 - t1) * 0.001 - p_t1;
				worldTime += delta;
				t1 = t2;
				p_t1 = 0;
				// w tym momencie t2-t1 to czas w milisekundach,
				// jaki uplyna³ od ostatniego narysowania ekranu
				// delta to ten sam czas w sekundach
				// here t2-t1 is the time in milliseconds since
				// the last screen was drawn
				// delta is the same time in seconds

				SDL_FillRect(screen, NULL, czarny);

				DrawSurface(screen, background, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);									//rysowanie objektów

				for (int i = 0; i < CAR_LANES; i++)
				{
					for (int j = 0; j < CAR_PER_LANE; j++)
					{
						if (i == 1 || i == 3) {
							cars[i][j].X -= cars[i][j].speed * delta;
							if (cars[i][j].X <= -15) {
								cars[i][j].X = 2 * SCREEN_WIDTH - 15;
							}
						}
						else {
							cars[i][j].X += cars[i][j].speed * delta;
							if (cars[i][j].X >= SCREEN_WIDTH * 2 - 15) {
								cars[i][j].X = -15;
							}
						}
						DrawSurface(screen, cars[i][j].image, cars[i][j].X, cars[i][j].Y);
					}
				}
				for (int i = 0; i < TURTLE_LANES; i++)
				{
					for (int j = 0; j < TURTLE_PER_LANE; j++)
					{
						turtles[i][j].X -= turtles[i][j].speed * delta;
						if (turtles[i][j].X <= -15) {
							turtles[i][j].X = 2 * SCREEN_WIDTH - 15;
						}
						DrawSurface(screen, turtles[i][j].image, turtles[i][j].X, turtles[i][j].Y);
					}
				}
				for (int i = 0; i < WOOD_LANES; i++)
				{
					for (int j = 0; j < WOOD_PER_LANE; j++)
					{
						woods[i][j].X += woods[i][j].speed * delta;
						if (woods[i][j].X >= 2 * SCREEN_WIDTH - 60) {
							woods[i][j].X = -60;
						}
						DrawSurface(screen, woods[i][j].image, woods[i][j].X, woods[i][j].Y);
					}
				}
				for (int i = 0; i < 5; i++) {
					DrawSurface(screen, frogs[0][i].image, frogs[0][i].X, frogs[0][i].Y);
				}

				if (worldTime <= 40) {																	//licznik czasu
					for (int i = 460; i <= 465; i++) {
						DrawLine(screen, 540, i, 100, 1, 0, niebieski);
						DrawLine(screen, i + 80, 460, 20, 0, 1, niebieski);
					}
				}
				else {
					DrawRectangle(screen, 540, 460, 100, 20,
						czerwony, czerwony);
				}
				sprintf(text, "Czas: %.1lfs ", worldTime);
				DrawString(screen, 548, 470, text, charset);

				for (int i = 460; i <= 465; i++) {														//licznik punktów
					DrawLine(screen, 0, i, 160, 1, 0, niebieski);
					DrawLine(screen, i-300, 460, 20, 0, 1, niebieski);
				}
				sprintf(text, "Punkty: %d  Zycia: %d", points, lives);
				DrawString(screen, 1, 470, text, charset);

				DrawSurface(screen, frogger, frog_X, frog_Y);

				for (int i = 0; i < CAR_LANES; i++)														//obs³uga kolizji
				{
					for (int j = 0; j < CAR_PER_LANE; j++)
					{
						if (frog_X >= cars[i][j].X - 28 && frog_X <= cars[i][j].X + 28 && frog_Y == cars[i][j].Y)
						{
							death(frog_X, frog_Y, line, worldTime, lives, points, max);
							break;
						}
					}
				}

				for (int i = 0; i < TURTLE_LANES; i++)													//p³ywanie i œmieræ w wodzie
				{
					for (int j = 0; j < TURTLE_PER_LANE; j++)
					{
						if (frog_X >= turtles[i][j].X - 17 && frog_X <= turtles[i][j].X + 17 && frog_Y == turtles[i][j].Y)
						{
							swim = true;
							frog_X = turtles[i][j].X;
							break;
						}
						else if (frog_Y == turtles[i][j].Y) {
							swim = false;
						}
					}
				}


				for (int i = 0; i < WOOD_LANES; i++)
				{
					for (int j = 0; j < WOOD_PER_LANE; j++)
					{
						if (frog_X >= woods[i][j].X - 42 && frog_X <= woods[i][j].X + 42 && frog_Y == woods[i][j].Y)
						{
							swim = true;
							frog_X += woods[i][j].speed * delta;
							break;
						}
						else if (frog_Y == woods[i][j].Y) {
							swim = false;
						}
					}
				}

				if (swim == false && (frog_Y == line * 2 || frog_Y == line * 3 || frog_Y == line * 4 || frog_Y == line * 5 || frog_Y == line * 6)) {
					death(frog_X, frog_Y, line, worldTime, lives, points, max);
				}

				if (frog_X < 0 || frog_X > 640) {																	//wyp³yniêcie poza planszê
					death(frog_X, frog_Y, line, worldTime, lives, points, max);
				}

				for (int i = 0; i < 5; i++) {																		//pojawienie siê ¿ab/checkmarków
					if (frog_X >= frogs[0][i].X - 2970 && frog_X <= frogs[0][i].X - 2930 && frog_Y == frogs[0][i].Y) {
						frogs[0][i].X = pos[0][i].X;
						frog_X = frog_X = SCREEN_WIDTH / 2, frog_Y = line * 13;
						crowns++;
						max = line * 13;
						points += 50 + (int)(50 - worldTime) * 10;
					}
					
				}

				if (frog_Y == line) {
					death(frog_X, frog_Y, line, worldTime, lives, points, max);
				}

				fpsTimer += delta;
				if (fpsTimer > 0.5) {
					fps = frames * 2;
					frames = 0;
					fpsTimer -= 0.5;
				};

				/*// tekst informacyjny / info text
				DrawRectangle(screen, 4, 4, SCREEN_WIDTH - 8, 36, czerwony, niebieski);
				//  "template for the second project, elapsed time = %.1lf s  %.0lf frames / s"
				sprintf(text, "Szablon drugiego zadania, czas trwania = %.1lf s  %.0lf klatek / s", worldTime, fps);
				DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, 10, text, charset);
				//  "Esc - exit, \030 - faster, \031 - slower"
				sprintf(text, "Esc - wyjscie, \030 - przyspieszenie, \031 - zwolnienie");
				DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, 26, text, charset);*/

				SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
				//		SDL_RenderClear(renderer);
				SDL_RenderCopy(renderer, scrtex, NULL, NULL);
				SDL_RenderPresent(renderer);
			}
		};
			// obs³uga zdarzeñ (o ile jakieœ zasz³y) / handling of events (if there were any)
			while (SDL_PollEvent(&event)) {
				switch (event.type) {
				case SDL_KEYDOWN:
					if (event.key.keysym.sym == SDLK_ESCAPE) {
						fclose(best);
						fclose(copy);
						quit = 1;
					}
					if (event.key.keysym.sym == SDLK_p) {										//w³¹czenie pauzy
						if (pause == true) {
							pause = false;
						}
						else {
							pause = true;
							DrawRectangle(screen, SCREEN_WIDTH, SCREEN_HEIGHT / 2, SCREEN_WIDTH - 8, 36, czerwony, niebieski);
							sprintf(text, "PAUSED");
							DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 16, text, charset);
							SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
							SDL_RenderCopy(renderer, scrtex, NULL, NULL);
							SDL_RenderPresent(renderer);
						}
					}
					else if (event.key.keysym.sym == SDLK_UP || event.key.keysym.sym == SDLK_w) {											//sterowanie
						frog_Y -= line;
						if (frog_Y < max) {
							max = frog_Y;
							points += 10;
						}
					}
					else if (event.key.keysym.sym == SDLK_DOWN || event.key.keysym.sym == SDLK_s) {
						if (frog_Y <= line * 12)
							frog_Y += line;
					}
					else if (event.key.keysym.sym == SDLK_LEFT || event.key.keysym.sym == SDLK_a) {
						if (frog_X >= (SCREEN_WIDTH - 12) / 17)
							frog_X -= (SCREEN_WIDTH - 12) / 17;
					}
					else if (event.key.keysym.sym == SDLK_RIGHT || event.key.keysym.sym == SDLK_d) {
						if (frog_X <= (SCREEN_WIDTH - 12) / 17 * 16)
							frog_X += (SCREEN_WIDTH - 12) / 17;
					}
					else if (event.key.keysym.sym == SDLK_q) {																			//wyjœcie z gry
						pause = true;
						bool ask = true;
						DrawRectangle(screen, SCREEN_WIDTH, SCREEN_HEIGHT / 2, SCREEN_WIDTH - 8, 36, czerwony, niebieski);
						sprintf(text, "Zakonczyc gre?");
						DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 16, text, charset);
						sprintf(text, "Y/N");
						DrawString(screen, screen->w / 2 - strlen(text) * 8 / 2, SCREEN_HEIGHT / 2 + 26, text, charset);
						SDL_UpdateTexture(scrtex, NULL, screen->pixels, screen->pitch);
						SDL_RenderCopy(renderer, scrtex, NULL, NULL);
						SDL_RenderPresent(renderer);
						while (ask == true) {
							while (SDL_PollEvent(&event)) {
								switch (event.type) {
								case SDL_KEYDOWN:
									if (event.key.keysym.sym == SDLK_ESCAPE || event.key.keysym.sym == SDLK_y) {
										menu = true;
										ask = false;
									}
									if (event.key.keysym.sym == SDLK_n) {
										stop(pause, t2, t1, p_t1);
										pause = false;
										ask = false;
										break;
								case SDL_QUIT:
									quit = 1;
									break;
									};
								};
							}
						}
					}
					break;
				case SDL_QUIT:
					quit = 1;
					break;
				}
			};
					
	};
	frames++;

	// zwolnienie powierzchni / freeing all surfaces
	free(highscore);
	SDL_FreeSurface(background);
	SDL_FreeSurface(charset);
	SDL_FreeSurface(screen);
	SDL_DestroyTexture(scrtex);
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);

	SDL_Quit();
	return 0;
};

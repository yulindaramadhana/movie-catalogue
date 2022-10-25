import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Movie', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(()=>{
        addLikeButtonContainer();
    })

    it('should show liked button when the movie has not been liked before', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        expect(document.querySelector('[aria-label="like this movie"]'))
        .toBeTruthy();

    });

    it('should not show unliked button when the movie has not been liked before', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this movie"]'))
        .toBeFalsy();

    });

    it('should be able to like the movie', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        // simulasi tombol like di tekan
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Tambahkan film dengan ID 1 ke daftar film yang disukai
        const movie = await FavoriteMovieIdb.getMovie(1);

        expect(movie).toEqual({ id: 1 });

        // delete movie dengan ID 1
        FavoriteMovieIdb.deleteMovie(1);

    });

    it('should not add the movie when its already liked', async () => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        // Tambahkan film dengan ID 1 ke daftar film yang disukai
        await FavoriteMovieIdb.getMovie(1);

        // simulasi tombol like di tekan
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

         // tidak ada film yang ganda
        expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

        // delete movie dengan ID 1
        FavoriteMovieIdb.deleteMovie(1);

    });

    it('should not add the movie when it has no id', async ()=> {
        await TestFactories.createLikeButtonPresenterWithMovie({});
       
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);

    });
});
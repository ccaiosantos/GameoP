import styles from "./StarRating.module.css";

export function StarRating({rating =0, size= "md", interactive = false, onChange}){
    const stars = [1,2,3,4,5];

    function handleClick(value){
        if(interactive && onChange){
            onChange(value)
        }
    }
    return(
        <div
         className={`${styles.wrapper} ${styles[size]} ${interactive ? styles.interactive : ""}`}
      aria-label={`Avaliação: ${rating} de 5 estrelas`}
        > {stars.map((starValue) => {
        const isFilled = starValue <= Math.round(rating);
        const isHalf = !isFilled && starValue - 0.5 <= rating;

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            className={`${styles.star} ${isFilled ? styles.filled : ""} ${isHalf ? styles.half : ""}`}
            disabled={!interactive}
            aria-label={`${starValue} estrela${starValue > 1 ? "s" : ""}`}
          >
            ★
          </button>
        );
      })}

      {rating > 0 && (
        <span className={styles.value}>{Number(rating).toFixed(1)}</span>
      )}</div>
    );
}
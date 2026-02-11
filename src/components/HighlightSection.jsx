function HighlightSection({ id, title, text }) {
    return (
      <section id={id} style={styles.section}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.text}>{text}</p>
      </section>
    );
  }
  
  const styles = {
    section: {
      background: "#0b1c2d",
      color: "#fff",
      padding: "60px 8%",
      textAlign: "center"
    },
    title: {
      fontSize: "32px",
      marginBottom: "20px"
    },
    text: {
      maxWidth: "800px",
      margin: "auto",
      color: "#d0d8e6",
      fontSize: "17px"
    }
  };
  
  export default HighlightSection;
  
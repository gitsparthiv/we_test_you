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
      background: "#e0f2fe",
      color: "#0f172a",
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
      color: "#334155",
      fontSize: "17px"
    }
  };
  
  export default HighlightSection;
  
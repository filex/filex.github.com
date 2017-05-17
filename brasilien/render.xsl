<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:output method="html" indent="yes" encoding="utf-8" />

<xsl:variable name="journey" select="document('./journey.xml')" />
<xsl:param name="curr" />

<xsl:template match="div[@class='content']">
  <xsl:copy>
    <xsl:apply-templates select="@* | node() | $journey/journey/page"/>
  </xsl:copy>
</xsl:template>

<xsl:template match="page">
  <div class="entry">
	  <xsl:choose>
		<xsl:when test="@file = $curr">
		  <h2 id="main" class="date"><xsl:value-of select="@date" /></h2>
		  <h3 class="title"><xsl:value-of select="@title" /></h3>
		  <xsl:apply-templates select="content/*"/>
		</xsl:when>
		<xsl:otherwise>
		  <a href="{@file}#main">
			<h2 class="date"><xsl:value-of select="@date" /></h2>
			<h3 class="title"><xsl:value-of select="@title" /></h3>
		  </a>
		</xsl:otherwise>
	  </xsl:choose>
  </div>
</xsl:template>


<xsl:template match="node() | @*">
  <xsl:copy>
    <xsl:apply-templates select="@* | node()"/>
  </xsl:copy>
</xsl:template>

</xsl:stylesheet>

val strefy: Seq[String] = java.util.TimeZone.getAvailableIDs.toSeq 


println(strefy.filter(x => x.contains("Europe")).map(x => x.stripPrefix("Europe/")).sortBy(_.length))
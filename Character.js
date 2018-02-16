
class Character {
  constructor(data) {
    this.m_Name = data.Name;
    this.m_Class = data.Class;
    this.m_Race = data.Race;
    this.m_Sex = data.Sex;
    this.m_Age = data.Age;
    this.m_Height = data.Height;
    this.m_Weight = data.Weight;
    this.m_Skin = data.Skin;
    this.m_Eyes = data.Eyes;
    this.m_Hair = data.Hair;
    this.m_Sens = data.Sens;
    this.m_Gods = data.Gods;
    this.m_Languages = data.Languages;
    this.m_Alignment = data.Alignment;
    this.m_Level = data.Level;
    this.m_Exp = data.Exp;
    this.m_LevelUpExp = data.LevelUpExp;
    this.m_Strength = data.Strength;
    this.m_Dexterity = data.Dexterity;
    this.m_Stamina = data.Stamina;
    this.m_Atunemet = data.Atunemet;
    this.m_Wisdom = data.Wisdom;
    this.m_Charisma = data.Charisma;
    this.m_ModStren = Math.floor(this.m_Strength/2 - 5);
    this.m_ModDext = Math.floor(this.m_Dexterity/2 - 5);
    this.m_ModStam = Math.floor(this.m_Stamina/2 - 5);
    this.m_ModAtune = Math.floor(this.m_Atunemet/2 - 5);
    this.m_ModWisdom = Math.floor(this.m_Wisdom/2 - 5);
    this.m_ModCharis = Math.floor(this.m_Charisma/2 - 5);
    this.m_LifePointMax = data.LifePointMax;
    this.m_LifePoint = data.LifePoint;
  }

  SePresente() {
    return "Je suis " + this.m_Name + " de classe " + this.m_Class + " de la race " + this.m_Race;
  }

  AfficheComp() {
    return "Force : " + this.m_Strength + " + " + this.m_ModStren +
    "\nDexterité : " + this.m_Dexterity + " + " + this.m_ModDext +
    "\nConstitution : " + this.m_Stamina + " + " + this.m_ModStam +
    "\nConnaisance : " + this.m_Atunemet + " + " + this.m_ModAtune +
    "\nSagesse : " + this.m_Wisdom +" + " + this.m_ModWisdom +
    "\nCharisme : " + this.m_Charisma + " + " + this.m_ModCharis;
  }

  UpdateMod() {
    this.m_ModStren = Math.floor(this.m_Strength/2 - 5);
    this.m_ModDext = Math.floor(this.m_Dexterity/2 - 5);
    this.m_ModStam = Math.floor(this.m_Stamina/2 - 5);
    this.m_ModAtune = Math.floor(this.m_Atunemet/2 - 5);
    this.m_ModWisdom = Math.floor(this.m_Wisdom/2 - 5);
    this.m_ModCharis = Math.floor(this.m_Charisma/2 - 5);
  }
}

module.exports = Character;

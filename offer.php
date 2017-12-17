<?php
$title_h = "Naša ponudba | Avtomobili.si";
$description = "";
$keywords = "avto, avtomobili, novi avtomobili, prodaja avtomobilov";

$znamka = $_GET['znamka'];
$model = $_GET['model'];

include 'functions/header.php';  
?>
    <div class="content-wrapper">
      <!-- header image with search box -->
      <div class="header-img">
        <img src="images/car_red.jpg">
        <h1>PREVERITE PONUDBO</h1>
        <div class="search-box">
          <h3 class="line">Izberite znamko in model avtomobila</h3>
          <div class="flex">
            <div id="select_brand" class="select">
              <div class="select-styled"><?=($znamka>0 ? get_brand($con,$znamka) : 'Izberite znamko')?></div>
              <ul class="select-options" style="display: none;">
                <?=get_brands_list($con)?>
              </ul>
            </div>            
            <span class="arrow"></span>            
            <div id="select_model" class="select<?=($znamka>0 ? '' : ' disabled')?>">
              <div class="select-styled"><?=($model>0 ? get_model($con,$model) : 'Izberite model')?></div>
              <ul class="select-options" style="display: none;">
                <?=($znamka>0 ? get_models_list($con,$znamka) : '')?>
              </ul>
            </div>            
            <button id="search">NAJDI
            </button> 
          </div>
        </div>
        
      </div>
      <!-- logos container -> search brand by logo -->
      <div class="logos <?=($znamka>0 ? 'closed':'opened')?>" id="logos">
        <div class="wrapper">
          <div class="inner-wrapper">
            <?=get_brands_logos_list($con)?>
          </div>          
        </div>
        <div class="trigger" data-toggle="openLogos">
          <span>Išči po logotipih</span>
        </div>
      </div>
      <!-- page content -->
      <div class="container">
        <section id="config">
          <h3>Izberite kriterije za vozilo</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="heading gas">Tip pogona</div>
              <div class="flex">
                <div class="checkbox">
                  <input type="checkbox" name="drive" id="dizel" value="1" class="check" checked>
                  <label for="dizel">Dizel</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox" name="drive" id="bencin" value="2" class="check" checked>
                  <label for="bencin">Bencin</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox"  name="drive" id="elektrika" value="3" class="check" checked>
                  <label for="elektrika">Elektrika</label>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="heading gear">Menjalnik</div>
              <div class="flex">
                <div class="checkbox">
                  <input type="checkbox" name="gear" id="rocni" value="1" class="check" checked>
                  <label for="rocni">Ročni</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox" name="gear" id="avtomatski" value="2" class="check" checked>
                  <label for="avtomatski">Avtomatski</label>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="selection">
        </section>
        
        <section class="row" id="line">
          <div class="side-menu col-md-3">
            <h3>Izberite linijo</h3>
            <ul>
            </ul>
          </div>
          
          <div id="engineList" class="col-md-9">
            <h3 class="heading">Izberite motor</h3>
            <div class="row">
              
            </div>
          </div>
        </section>
      </div>
      <section id="offer">
        <h2>Ponudba za vas</h2>
        <div class="price">
          že od 
          <big> 
            <label class="animate-number prevent-animation"
                 data-char="€"
                 data-prefix=""
                 data-value="20450"
                 data-counts="50"
                 data-speed="10"
                 data-digits="2"></label>
            <span>Stroški so všteti v ceno</span>
          </big>
          
        </div>
        <div class="row">
          <div class="col-md-6">
            <h3>Obiščite nas osebno</h3>
            <div id="map"></div>
          </div>
          <div class="col-md-6">
            <h3>Pošljite nam povpraševanje</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed   do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <input type="text" id="name" class="person" placeholder="Ime">
            <input type="mail" id="namailme" class="afna" placeholder="E-naslov">
            <textarea id="message">Vaše sporočilo ali koda konfiguratorja</textarea>
            <button>Pošljite brezplačno povpraševanje zdaj</button>
            <p class="sub">Vaših podatkov ne bomo delili z nepooblaščenimi osebami</p>
          </div>
        </div>
        <p class="sub col-md-8">Prikazana vozila lahko v posameznih detajlih odstopajo od trenutne ponudba za slovenski trg. Na slikah so prikazani nekateri elementi dodatne opreme, ki so na voljo za doplačilo. Vse cene so neobvezujoče priporočene cene, vkljulno z DDV in davkom na motorna vozila.</p>
      </section>
<?php
include 'functions/footer.php';  
?>  
<!-- costum header -->
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1">
	<?php global $smof_data, $post, $page, $paged;?>
	<?php if($smof_data['custom_css']){ echo '<style>'.$smof_data["custom_css"].'</style>'; } ?>
	<?php if($smof_data['space_head']){ echo $smof_data["space_head"]; } ?>
	<?php require_once ( get_template_directory() . '/framework/includes/header-extend.php' ); ?>
	<?php require_once ( get_template_directory() . '/framework/includes/dynamic_css.php' ); ?>
	<?php wp_head(); ?>
<style>
.cs-blog .cs-blog-thumbnail {display: none;}
</style>   
</head>


<body class="csbody">
    <?php if( $smof_data['page_loader'] == '1'):?>
    <div id="cs_loader" style="height:100vh;width:100vw;background-color: #fff;"></div>
    <?php endif;?>
	<div id="wrapper"<?php if( $smof_data['page_loader'] == '1'):?> class="cs_hidden"<?php endif;?>>
	
			<?php if(cshero_show_page_title() == '1'): ?>
			<div class="cs-content-header">
			<?php if($smof_data['page_title_bar_style'] == 'corporate'): ?>
			<div style="background:url(<?php echo esc_url($smof_data['page_title_image']); ?>) center top; background-size:cover;height:<?php if(esc_attr($smof_data['page_title_image_height'])){ echo esc_attr($smof_data['page_title_image_height']);} else { echo 'auto'; } ?>;">
			</div>
			<?php endif; ?>
			
			</div>
			</div>
		<?php endif; ?>
	
<!-- end of custom header -->



<!-- ?php global $smof_data,$breadcrumb; $layout = cshero_generetor_layout(); ? -->
	<div id="primary" style="background-color: #eaf5fe;" class="content-area<?php if($breadcrumb == '0'){ echo ' no_breadcrumb'; }; ?>">
        <div class="container">
            <div class="row">
            	
            	
                <div class="content-wrap <?php echo $layout->blog; ?>">
                    <main id="main" class="site-main" role="main">
<button style="margin-top: 15px; margin-bottom: 15px;" onclick="goBack()">Zurück</button>

<script>
function goBack() {
    window.history.back();
}
</script>
                        <?php while ( have_posts() ) : the_post(); ?>

                            <?php get_template_part( 'framework/templates/single/single',get_post_format()); ?>

                          
                            <?php
                            	$tags = wp_get_post_tags(get_the_ID());
                            	if($smof_data['show_tags_post'] == '1' && count($tags) > 0):
                            ?>
                            <div class="cs_tags clearfix">
	                           
							</div>
							<?php endif; ?>

                          

                        <?php endwhile; // end of the loop. ?>
<button onclick="goBack()">Zurück</button>
                    </main><!-- #main -->
                </div>
                
            
            </div>
        </div>
	</div><!-- #primary -->
	
<!-- footer custom -->	
	</body>
</html>